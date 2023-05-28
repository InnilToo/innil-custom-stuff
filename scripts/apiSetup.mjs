import { WhisperPlayers } from "./modules/applications/whisperPlayers.mjs";
import { gameTools } from "./modules/gameTools/_gameTools.mjs";
import { ITEMACRO, ItemMacroHelpers } from "./modules/itemMacros.mjs";
import { PublicAPI } from "./modules/publicAPI.mjs";
import { SocketsHandler } from "./modules/sockets.mjs";

export function setupAPI() {
  globalThis.INNIL = {
    token: {
      teleport: PublicAPI._teleportTokens,
      target: PublicAPI._targetTokens,
      getOwnerIds: PublicAPI._getTokenOwnerIds,
      contained: PublicAPI._checkTokenInTemplate,
      selectContained: PublicAPI._selectContained,
    },
    utils: {
      setForageDC: PublicAPI._setForageDC,
      getDocument: PublicAPI._getDocumentFromCompendium,
      roman: PublicAPI._romanize,
      whisperPlayers: WhisperPlayers.whisperPlayers,
      titleCard: PublicAPI._titleCard,
      drawCircle: ItemMacroHelpers.drawCircle,
      loadTextureForAll: SocketsHandler.loadTextureForAll,
      createTiles: SocketsHandler.createTiles,
      awardLoot: SocketsHandler.awardLoot,
      updateToken: SocketsHandler.updateTokens,
      grantItems: SocketsHandler.grantItems,
      healToken: SocketsHandler.healToken,
      ...gameTools,
    },
    ITEMACRO,
  };
}