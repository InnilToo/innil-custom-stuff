import { MODULE_NAME } from "../const.mjs";

export class INNIL_COMBAT {
    
	static mark_defeated_combatant = async (tokenDoc, updates) => {
		if ( !game.settings.get(MODULE_NAME, "markDefeatedCombatants") ) return;
		if ( tokenDoc.actor.hasPlayerOwner ) return;
		const hpUpdate = foundry.utils.getProperty(updates, "actorData.system.attributes.hp.value");
		if ( hpUpdate === undefined ) return;
		if ( hpUpdate > 0 ) {
			await tokenDoc.actor.effects.find(i => i.getFlag("core", "statusId") === "dead")?.delete();
			await tokenDoc.combatant.update({defeated: false});
		}
		else {
			const effect = CONFIG.statusEffects.find(i => i.id === "dead");
			await tokenDoc.object.toggleEffect(effect, {overlay: true});
			await tokenDoc.combatant.update({defeated: true});
		}
	}
	
	static show_ammo_if_it_has_save = async (weapon, roll, ammoUpdate) => {
		if ( !game.settings.get(MODULE_NAME, "displaySavingThrowAmmo") ) return;
		if ( !ammoUpdate.length ) return;
		const ammoId = ammoUpdate[0]._id;
		const ammo = weapon.actor.items.get(ammoId);
		if ( ammo.hasSave ) return ammo.displayCard();
		return;
	}

}
