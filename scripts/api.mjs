import { drawCircle } from "./modules/animations.mjs";
import { applyDamageToTokens, DM_TOOL } from "./modules/dm_tool.mjs";
import { ITEMACRO } from "./modules/itemMacros.mjs";
import { INNIL_SOCKETS } from "./modules/sockets.mjs";
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

export class api {
  static register() {
    globalThis.INNIL = {
      token: {
        teleport: _teleportTokens,
        target: _targetTokens,
        getOwnerIds: _getTokenOwnerIds,
        multiTool: DM_TOOL.RENDER,
        contained: _checkTokenInTemplate,
        selectContained: _selectContained,
        applyDamage: applyDamageToTokens,
      },
      utils: {
        getDocument: _getDocumentFromCompendium,
        roman: _romanize,
        whisperPlayers: _whisperPlayers,
        titleCard: _titleCard,
        drawCircle: drawCircle,
        loadTextureForAll: INNIL_SOCKETS.loadTextureForAll,
        createTiles: INNIL_SOCKETS.createTiles,
        awardLoot: INNIL_SOCKETS.awardLoot,
        updateToken: INNIL_SOCKETS.updateTokens,
        grantItems: INNIL_SOCKETS.grantItems,
      },
      ITEMACRO,
    };
  }
}
