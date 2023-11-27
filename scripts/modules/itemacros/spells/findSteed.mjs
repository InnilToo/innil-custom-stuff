import { DEPEND } from "../../../const.mjs";
import { ItemMacroHelpers } from "../../itemMacros.mjs";

export async function FIND_STEED(item, speaker, actor, token, character, event, args) {
  if (!ItemMacroHelpers._getDependencies(DEPEND.EM, DEPEND.WG)) return item.use();

  const actorName = actor.name;
  const steeds = {
    "QA Bobby": {
      name: "dummy",
    },
    "Zedarr T'sarran": {
      name: "Murrpau",
    },
  };

  const steed = steeds[actorName];
  if (!steed) return ui.notifications.warn("Can't spawn a steed for an unknown actor.");

  const isActive = actor.statuses.has(item.name.slugify({ strict: true }));
  if (isActive) {
    return ui.notifications.warn(`You already have ${steed.name} spawned.`);
  }

  const use = await item.use();
  if (!use) return;

  const updates = {};
  const options = { crosshairs: { interval: -1 } };

  // then spawn the actor:
  await actor.sheet?.minimize();
  const p = ItemMacroHelpers.drawCircle(token, item.system.range.value);
  const [spawn] = await ItemMacroHelpers._spawnHelper(steed.name, updates, {}, options);
  canvas.app.stage.removeChild(p);
  await actor.sheet?.maximize();
  if (!spawn) return;

  const level = ItemMacroHelpers._getSpellLevel(use);
  const effectData = ItemMacroHelpers._constructGenericEffectData({
    item,
    level,
    types: ["redisplay"],
  });
  const [effect] = await actor.createEmbeddedDocuments("ActiveEffect", effectData);
  return ItemMacroHelpers._addTokenDismissalToEffect(effect, spawn);
}
