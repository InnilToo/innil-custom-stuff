import { DEPEND } from "../../../const.mjs";
import { ItemMacroHelpers } from "../../itemMacros.mjs";

export async function MAGE_HAND(
  item,
  speaker,
  actor,
  token,
  character,
  event,
  args
) {
  if (!ItemMacroHelpers._getDependencies(DEPEND.EM, DEPEND.WG))
    return item.use();

  const isActive = actor.statuses.has(item.name.slugify({ strict: true }));
  if (isActive) {
    return ui.notifications.warn(`You already have ${steed.name} spawned.`);
  }

  const use = await item.use();
  if (!use) return;

  const updates = {
    token: { name: `${actor.name.split(" ")[0]}'s Mage Hand` },
  };
  const options = { crosshairs: { interval: -1 } };

  // then spawn the actor:
  await actor.sheet?.minimize();
  const p = ItemMacroHelpers.drawCircle(token, item.system.range.value);
  const [spawn] = await ItemMacroHelpers._spawnHelper(
    "Mage Hand",
    updates,
    {},
    options
  );
  canvas.app.stage.removeChild(p);
  await actor.sheet?.maximize();
  if (!spawn) return;

  const level = ItemMacroHelpers._getSpellLevel(use);
  const effectData = ItemMacroHelpers._constructGenericEffectData({
    item,
    level,
    types: ["redisplay"],
  });
  const [effect] = await actor.createEmbeddedDocuments(
    "ActiveEffect",
    effectData
  );
  return ItemMacroHelpers._addTokenDismissalToEffect(effect, spawn);
}
