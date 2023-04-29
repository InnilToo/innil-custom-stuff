import { DEPEND } from "../../../const.mjs";
import { drawCircle } from "../../animations.mjs";
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
  const isActive = actor.effects.find((e) => {
    return e.flags.core?.statusId === item.name.slugify({ strict: true });
  });
  if (isActive)
    return ui.notifications.warn("You are already have a Mage Hand.");

  const use = await item.use();
  if (!use) return;

  const updates = {
    token: { name: `${actor.name.split(" ")[0]}'s Mage Hand` },
  };
  const options = { crosshairs: { interval: -1 } };

  // then spawn the actor:
  const p = drawCircle(token, item.system.range.value);
  await actor.sheet.minimize();
  const [spawn] = await ItemMacroHelpers._spawnHelper(
    "Mage Hand",
    updates,
    {},
    options
  );
  await actor.sheet.maximize();
  canvas.app.stage.removeChild(p);

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
  if (!spawn) return effect.delete();
  return ItemMacroHelpers._addTokenDismissalToEffect(effect, spawn);
}
