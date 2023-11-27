import { DEPEND } from "../../../const.mjs";
import { ItemMacroHelpers } from "../../itemMacros.mjs";

export async function RING_OF_LIGHT(item, speaker, actor, token, character, event, args) {
  if (!ItemMacroHelpers._getDependencies(DEPEND.EM, DEPEND.VAE)) return item.use();

  if (!item.system.equipped) await item.update({ "system.equipped": true }); // Forcefully equip the item.

  const has = actor.effects.find((e) => e.statuses.has(item.name.slugify({ strict: true })));
  if (has) return has.delete();

  const use = await item.use();
  if (!use) return;

  const lightData = { bright: 30, dim: 60 };
  return actor.createEmbeddedDocuments("ActiveEffect", ItemMacroHelpers._constructLightEffectData({ item, lightData }));
}
