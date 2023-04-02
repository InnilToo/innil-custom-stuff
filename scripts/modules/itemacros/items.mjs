import { DEPEND } from "../../const.mjs";
import {
  _basicFormContent,
  _constructLightEffectData,
  _getDependencies,
} from "../itemMacros.mjs";

export const ITEMACRO_ITEMS = {
  HIT_DIE_APPLY,
  LANTERN_OF_TRACKING,
  RING_OF_LIGHT,
  TORCH,
};

async function HIT_DIE_APPLY(
  item,
  speaker,
  actor,
  token,
  character,
  event,
  args
) {
  const use = await item.use();
  if (!use) return;
  return actor.rollHitDie(undefined, { dialog: false });
}

async function RING_OF_LIGHT(
  item,
  speaker,
  actor,
  token,
  character,
  event,
  args
) {
  if (!_getDependencies(DEPEND.EM, DEPEND.VAE)) return item.use();

  const has = actor.effects.find(
    (e) => e.flags.core?.statusId === item.name.slugify({ strict: true })
  );
  if (has) return has.delete();

  const use = await item.use();
  if (!use) return;

  const lightData = { bright: 30, dim: 60 };
  return actor.createEmbeddedDocuments(
    "ActiveEffect",
    _constructLightEffectData({ item, lightData })
  );
}

async function TORCH(item, speaker, actor, token, character, event, args) {
  if (!_getDependencies(DEPEND.EM, DEPEND.VAE)) return item.use();

  const has = actor.effects.find(
    (e) => e.flags.core?.statusId === item.name.slugify({ strict: true })
  );
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
  return actor.createEmbeddedDocuments(
    "ActiveEffect",
    _constructLightEffectData({ item, lightData })
  );
}

async function LANTERN_OF_TRACKING(
  item,
  speaker,
  actor,
  token,
  character,
  event,
  args
) {
  if (!_getDependencies(DEPEND.EM, DEPEND.VAE)) return item.use();

  const has = actor.effects.find(
    (e) => e.flags.core?.statusId === item.name.slugify({ strict: true })
  );
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
  await actor.createEmbeddedDocuments(
    "ActiveEffect",
    _constructLightEffectData({ item, lightData })
  );
  return oilFlask.update({ "system.quantity": quantity - 1 });
}
