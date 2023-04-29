import { gameTools } from "./modules/gameTools/_gameTools.mjs";
import {
  _checkTokenInTemplate,
  _getDocumentFromCompendium,
  _getTokenOwnerIds,
  _romanize,
  _selectContained,
  _targetTokens,
  _teleportTokens,
  _titleCard,
  _whisperPlayers,
} from "./modules/innil_functions.mjs";
import { ITEMACRO, ItemMacroHelpers } from "./modules/itemMacros.mjs";
import { SocketsHandler } from "./modules/sockets.mjs";

export class api {
  static register() {
    globalThis.INNIL = {
      token: {
        teleport: _teleportTokens,
        target: _targetTokens,
        getOwnerIds: _getTokenOwnerIds,
        contained: _checkTokenInTemplate,
        selectContained: _selectContained,
      },
      utils: {
        getDocument: _getDocumentFromCompendium,
        roman: _romanize,
        whisperPlayers: _whisperPlayers,
        titleCard: _titleCard,
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
}
