import { DEPEND } from "../../../const.mjs";
import { ItemMacroHelpers } from "../../itemMacros.mjs";

export async function TORCH(item, speaker, actor, token, character, event, args) {
  if (!ItemMacroHelpers._getDependencies(DEPEND.EM, DEPEND.VAE)) return item.use();

  if (!item.system.equipped) await item.update({ "system.equipped": true }); // Forcefully equip the item.

  const has = actor.effects.find((e) => e.statuses.has(item.name.slugify({ strict: true })));
  if (has) return has.delete();

  const use = await item.use();
  if (!use) return;

  const lightData = {
    alpha: 0.05,
    angle: 360,
    animation: { type: "flame", speed: 2, intensity: 4 },
    attenuation: 0.5,
    color: "#ff4d00",
    bright: 20,
    dim: 40,
    coloration: 1,
    contrast: 0,
    darkness: { min: 0, max: 1 },
    luminosity: 0.5,
    saturation: 0,
    shadows: 0,
  };
  return actor.createEmbeddedDocuments("ActiveEffect", ItemMacroHelpers._constructLightEffectData({ item, lightData }));
}
