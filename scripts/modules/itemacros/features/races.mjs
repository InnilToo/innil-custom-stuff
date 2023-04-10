import { DEPEND, MODULE } from "../../../const.mjs";
import {
  _addTokenDismissalToEffect,
  _basicFormContent,
  _bladeCantripDamageBonus,
  _constructDetectionModeEffectData,
  _constructGenericEffectData,
  _getDependencies,
  _getItemDuration,
  _getSpellLevel,
  _spawnHelper,
  _teleportationHelper,
} from "../../itemMacros.mjs";

export const races = { BLESSING_OF_THE_RAVEN_QUEEN, RELENTLESS_ENDURANCE };

async function BLESSING_OF_THE_RAVEN_QUEEN(
  item,
  speaker,
  actor,
  token,
  character,
  event,
  args
) {
  if (!_getDependencies(DEPEND.SEQ, DEPEND.JB2A, DEPEND.WG)) return item.use();
  const vanish = "jb2a.misty_step.01.dark_black";
  const appear = "jb2a.misty_step.02.dark_black";
  const distance = 30;

  const use = await item.use();
  if (!use) return;

  return _teleportationHelper({ item, actor, token, vanish, appear, distance });
}

async function RELENTLESS_ENDURANCE(
  item,
  speaker,
  actor,
  token,
  character,
  event,
  args
) {
  if (actor.system.attributes.hp.value > 0) {
    ui.notifications.warn("You have not been reduced to zero hit points.");
    return;
  }
  const use = await item.use();
  if (!use) return;
  return actor.update({ "system.attributes.hp.value": 1 }, { dhp: 1 });
}
