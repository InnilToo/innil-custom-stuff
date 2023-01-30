import { MODULE_TITLE, MODULE_TITLE_SHORT } from "./scripts/const.mjs";
import { registerSettings } from "./scripts/settings.mjs";
import { api } from "./scripts/api.mjs";
import { INNIL_SOCKETS } from "./scripts/modules/sockets.mjs";
import { INNIL_ADDITIONS } from "./scripts/modules/game_additions.mjs";
import { INNIL_REPLACEMENTS } from "./scripts/modules/game_replacements.mjs";
import { INNIL_SHEET } from "./scripts/modules/sheet_edits.mjs";
import { INNIL_COMBAT } from "./scripts/modules/combat_helpers.mjs";
import { innil_exhaustion } from "./scripts/modules/exhaustion.mjs";
import { INNIL_ANIMATIONS } from "./scripts/modules/animations.mjs";

Hooks.once("init", () => {
	console.log(`${MODULE_TITLE_SHORT} | Initializing ${MODULE_TITLE}`);
	registerSettings();
	api.register();
});

Hooks.once("setup", () => {
	// additions.
	INNIL_ADDITIONS.add_equipment_types();
	INNIL_ADDITIONS.add_conditions();

	// replacements.
	INNIL_REPLACEMENTS.replace_consumable_types();
	INNIL_REPLACEMENTS.replace_languages();
	INNIL_REPLACEMENTS.replace_tools();
	INNIL_REPLACEMENTS.replace_weapons();
	INNIL_REPLACEMENTS.replace_status_effects();

	// rename currency labels; this shows up on the sheet.
	INNIL_SHEET.rename_currency_labels();

	// create a exhaustion pop up on click
	innil_exhaustion();
});

Hooks.once("ready", () => {
	// disable short and long rest.
	Hooks.on("renderLongRestDialog", INNIL_SHEET.disable_long_rest);
	Hooks.on("renderShortRestDialog", INNIL_SHEET.disable_short_rest);

	// sheet edits.
	Hooks.on("renderActorSheet", INNIL_SHEET.rename_rest_labels);
	Hooks.on("renderActorSheet", INNIL_SHEET.remove_resources);
	Hooks.on("renderActorSheet", INNIL_SHEET.remove_alignment);
	Hooks.on("renderActorSheet", INNIL_SHEET.disable_initiative_button);
	Hooks.on("renderActorSheet", INNIL_SHEET.collapsible_headers);

	// create dots for limited uses and spell slots.
	Hooks.on("renderActorSheet", INNIL_SHEET.create_dots);

	// color magic items of uncommon or higher quality.
	Hooks.on("renderActorSheet", INNIL_SHEET.color_magic_items);

	// make the attunement button an actual toggle.
	Hooks.on("renderActorSheet", INNIL_SHEET.create_toggle_on_attunement_button);

	// make the trait and proficiency selectors less ugly.
	Hooks.on("renderTraitSelector", INNIL_SHEET.pretty_trait_selector);

	// refresh colors.
	INNIL_SHEET.refreshColors();

	// mark 0 hp combatants as defeated.
	if (game.user.isGM) Hooks.on("updateToken", INNIL_COMBAT.mark_defeated_combatant);

	// display ammo when you make an attack, if the ammo has a save.
	Hooks.on("dnd5e.rollAttack", INNIL_COMBAT.show_ammo_if_it_has_save);

	// set up sockets.
	INNIL_SOCKETS.loadTextureSocketOn(); // loadTextureForAll
	INNIL_SOCKETS.routeTilesThroughGM(); // let players create tiles.

	// add 'view scene' to scene config headers.
	if (game.user.isGM) {
		Hooks.on("getSceneConfigHeaderButtons", (app, array) => {
			const viewBtn = {
				class: "innil-custom-stuff-view-scene",
				icon: "fas fa-eye",
				label: "View Scene",
				onclick: async () => await app.object.view(),
			};
			array.unshift(viewBtn);
		});
	}

	// hook for when measured templates are created to display animation.
	const canAnimate = ["sequencer", "jb2a_patreon"].every((id) => !!game.modules.get(id)?.active);
	if (canAnimate) {
		Hooks.on("createMeasuredTemplate", INNIL_ANIMATIONS.onCreateMeasuredTemplate);
		Hooks.on("dnd5e.useItem", INNIL_ANIMATIONS.onItemUse);
		Hooks.on("dnd5e.rollAttack", INNIL_ANIMATIONS.onItemRollAttack);
		Hooks.on("dnd5e.rollDamage", INNIL_ANIMATIONS.onItemRollDamage);
		Hooks.on("dnd5e.rollSkill", INNIL_ANIMATIONS.onRollSkill);
	}
});
