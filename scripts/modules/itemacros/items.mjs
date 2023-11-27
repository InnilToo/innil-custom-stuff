import { DEPEND } from "../../const.mjs";
import { ItemMacroHelpers } from "../itemMacros.mjs";
import { HIT_DIE_APPLY } from "./items/hitDieApply.mjs";
import { LANTERN_OF_TRACKING } from "./items/lanternOfTracking.mjs";
import { RING_OF_LIGHT } from "./items/ringOfLight.mjs";
import { TORCH } from "./items/torch.mjs";

export const items = {
  FREE_USE,
  HIT_DIE_APPLY,
  LANTERN_OF_TRACKING,
  RING_OF_LIGHT,
  TORCH,
};

async function FREE_USE(item, speaker, actor, token, character, event, args) {
  return item.use({
    createMeasuredTemplate: null,
    consumeResource: null,
    consumeSpellSlot: null,
    consumeUsage: null,
  });
}
