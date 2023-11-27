import { DEPEND } from "../../../const.mjs";
import { ItemMacroHelpers } from "../../itemMacros.mjs";

export async function LANTERN_OF_TRACKING(item, speaker, actor, token, character, event, args) {
  if (!ItemMacroHelpers._getDependencies(DEPEND.EM, DEPEND.VAE)) return item.use();

  if (!item.system.equipped) await item.update({ "system.equipped": true }); // Forcefully equip the item.

  const has = actor.effects.find((e) => e.statuses.has(item.name.slugify({ strict: true })));
  if (has) return has.delete();

  const oilFlask = actor.items.getName("Oil Flask");
  if (!oilFlask) return ui.notifications.error("You have no Oil Flasks!");

  const quantity = oilFlask.system.quantity;
  if (!quantity) return ui.notifications.error("You have no Oil Flasks!");

  const use = await item.use();
  if (!use) return;
  const lightData = {
    alpha: 0.05,
    angle: 360,
    bright: 30,
    coloration: 1,
    dim: 60,
    luminosity: 0.5,
    saturation: 0,
    contrast: 0,
    shadows: 0,
    animation: { speed: 2, intensity: 4, reverse: false, type: "flame" },
    darkness: { min: 0, max: 1 },
    color: "#ff4d00",
    attenuation: 0.5,
  };
  await actor.createEmbeddedDocuments("ActiveEffect", ItemMacroHelpers._constructLightEffectData({ item, lightData }));
  return oilFlask.update({ "system.quantity": quantity - 1 });
}
