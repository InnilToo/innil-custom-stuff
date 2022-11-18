import { INNIL_UTILS } from "./innil_functions.mjs";

export class INNIL_SOCKETS {

	// load texture for all.
	static loadTextureSocketOn = () => {
		game.socket.on(`world.${game.world.id}`, (request) => {
			if (request.action === "loadTextureForAll") {
				INNIL_UTILS.loadTextureForAll(request.src, false);
			}
		});
	}

	// place tile.
	static routeTilesThroughGM = () => {
		game.socket.on(`world.${game.world.id}`, (request) => {
			if (request.action === "createTiles") {
				INNIL_UTILS.createTiles(request.tileData, false);
			}
		});
	}
}
