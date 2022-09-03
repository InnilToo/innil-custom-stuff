import { MODULE_TITLE, MODULE_TITLE_SHORT } from "./scripts/const.mjs";
import { registerSettings } from "./scripts/settings.mjs";
import { api } from "./scripts/api.mjs";
import { HandlebarHelpers, INNIL_EFFECTS_PANEL } from "./scripts/modules/effect-panel-classes.mjs";
import { INNIL_SOCKETS } from "./scripts/modules/sockets.mjs";
import { INNIL_ADDITIONS } from "./scripts/modules/game_additions.mjs";
import { INNIL_REPLACEMENTS } from "./scripts/modules/game_replacements.mjs";
import { INNIL_SHEET } from "./scripts/modules/sheet_edits.mjs";
import { INNIL_COMBAT } from "./scripts/modules/combat_helpers.mjs";

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
	Hooks.on("renderActorSheet", INNIL_SHEET.create_forage_counter);
	Hooks.on("renderActorSheet", INNIL_SHEET.set_hp_color);
	Hooks.on("renderActorSheet", INNIL_SHEET.disable_exhaustion);
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
	if(game.user.isGM) Hooks.on("updateToken", INNIL_COMBAT.mark_defeated_combatant);

	// display ammo when you make an attack, if the ammo has a save.
	Hooks.on("dnd5e.rollAttack", INNIL_COMBAT.show_ammo_if_it_has_save);

	// setup effectsPanel handlebar helpers, hooks, and other rendering.
	new HandlebarHelpers().registerHelpers(); // init helper setup.
	INNIL_EFFECTS_PANEL.effectsPanel.render(true); // init render.
	Hooks.on("collapseSidebar", (_, bool) => INNIL_EFFECTS_PANEL.effectsPanel.handleExpand(bool));
	for(let hook of [
		"updateWorldTime", "createActiveEffect", "updateActiveEffect",
		"deleteActiveEffect", "controlToken", "preUpdateToken"
	]){
		Hooks.on(hook, () => INNIL_EFFECTS_PANEL.effectsPanel.refresh());
	}
	
	// set up sockets.
	INNIL_SOCKETS.loadTextureSocketOn(); // loadTextureForAll
	INNIL_SOCKETS.routeTilesThroughGM(); // let players create tiles.
	
	// add 'view scene' to scene config headers.
	if(game.user.isGM){
		Hooks.on("getSceneConfigHeaderButtons", (app, array) => {
			const viewBtn = {
				class: "innil-custom-stuff-view-scene",
				icon: "fas fa-eye",
				label: "View Scene",
				onclick: async () => await app.object.view()
			}
			array.unshift(viewBtn);
		});
	}

});

Hooks.once("canvasReady", () => {

	// create initial effects panel in the class. CanvasReady happens before Ready.
	INNIL_EFFECTS_PANEL.createEffectsPanel();
});
