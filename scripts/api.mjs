import { INNIL_CATALOG, INNIL_REST, INNIL_UTILS } from "./modules/innil_functions.mjs";
import { EXHAUSTION_EFFECTS } from "../sources/exhaustion.js";

export class api {
  static register() {
    globalThis.INNIL = {
      setting: {
        toggleLR: INNIL_REST.toggleLR,
        toggleSR: INNIL_REST.toggleSR,
      },
      catalog: {
        getDocument: INNIL_CATALOG.fromCatalog,
        spawn: INNIL_CATALOG.spawnFromCatalog,
        mutate: INNIL_CATALOG.mutateFromCatalog,
        cast: INNIL_CATALOG.castFromCatalog,
        castCharges: INNIL_CATALOG.magicItemCast,
      },
      token: {
        teleport: INNIL_UTILS.teleportTokens,
        target: INNIL_UTILS.targetTokens,
        damage: INNIL_UTILS.apply_damage,
        getOwnerIds: INNIL_UTILS.get_token_owner_ids,
      },
      helper: {
        wait: INNIL_UTILS.wait,
        nth: INNIL_UTILS.nth,
        roman: INNIL_UTILS.romanize,
        rollItemMacro: INNIL_UTILS.rollItemMacro,
        whisperPlayers: INNIL_UTILS.whisper_players,
        loadTextureForAll: INNIL_UTILS.loadTextureForAll,
        createTiles: INNIL_UTILS.createTiles,
        titleCard: INNIL_UTILS.title_card,
      },
      exhaustion: {
        increase: INNIL_UTILS.increase_exhaustion,
        decrease: INNIL_UTILS.decrease_exhaustion,
        update: INNIL_UTILS.update_exhaustion,
        effects: EXHAUSTION_EFFECTS,
      },
    };
  }
}
