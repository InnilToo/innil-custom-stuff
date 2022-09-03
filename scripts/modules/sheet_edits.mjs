import { MODULE_NAME } from "../const.mjs";

export class INNIL_SHEET {
	
	static disable_long_rest = (dialog, html, data) => {
		const restDisabled = game.settings.get(MODULE_NAME, "toggleLR");
		if(!restDisabled) return;
		
		const restButton = html[0].querySelector("button[data-button='rest']");
		restButton.setAttribute("disabled", true);
	}
	
	static disable_short_rest = (dialog, html, data) => {
		const restDisabled = game.settings.get(MODULE_NAME, "toggleSR");
		if(!restDisabled) return;
		
		const rollButton = html[0].querySelector("#roll-hd");
		rollButton.setAttribute("disabled", true);
		const restButton = html[0].querySelector("button[data-button='rest']");
		restButton.setAttribute("disabled", true);
	}

	static rename_rest_labels = (sheet, html, sheetData) => {
		if(!game.settings.get(MODULE_NAME, "sheetSettings").rename_rest_labels) return;
		const SR = html[0].querySelector(".sheet-header .attributes a.rest.short-rest");
		const LR = html[0].querySelector(".sheet-header .attributes a.rest.long-rest");
		if(SR) SR.innerHTML = "SR";
		if(LR) LR.innerHTML = "LR";
	}

	// rename copper, etc etc, to CP, SP, EP, GP, PP.
	static rename_currency_labels = (sheet, html, sheetData) => {
		if(!game.settings.get(MODULE_NAME, "replacementSettings").rename_currency_labels) return;
		for(let d of ["cp", "ep", "gp", "pp", "sp"]){
			CONFIG.DND5E.currencies[d].label = d.toUpperCase();
		}
	}
	
	static remove_resources = (sheet, html, sheetData) => {
		if(!game.settings.get(MODULE_NAME, "sheetSettings").remove_resources) return;
		const resources = html[0].querySelector("section > form > section > div.tab.attributes.flexrow > section > ul");
		if(resources) resources.remove();
	}
	
	static remove_alignment = (sheet, html, sheetData) => {
		if(!game.settings.get(MODULE_NAME, "sheetSettings").remove_alignment) return;
		const AL = html[0].querySelector("input[name='system.details.alignment']");
		if(AL) AL.parentElement?.remove();
	}
	
	static disable_initiative_button = (sheet, html, sheetData) => {
		if(!game.settings.get(MODULE_NAME, "sheetSettings").disable_initiative_button) return;
		const initButton = html[0].querySelector(".dnd5e.sheet.actor .sheet-header .attributes .attribute.initiative > h4");
		if(initButton){
			initButton.classList.remove("rollable");
			initButton.removeAttribute("data-action");
		}
	}
	
	static create_forage_counter = (sheet, html, sheetData) => {
		if(!game.settings.get(MODULE_NAME, "sheetSettings").create_forage_counter) return;
		const actor = sheet.actor;
		if(!sheetData.isCharacter) return;
		
		const value = actor.getFlag(MODULE_NAME, "materia-medica.value") ?? 0;
		const materia = document.createElement("div");
		materia.setAttribute("class", "counter flexrow materia");
		materia.innerHTML = `
			<h4>Foraged Materials</h4>
			<div class="counter-value">
				<input
					class="material"
					name="flags.innil-custom-stuff.materia-medica.value"
					type="number"
					value="${value}"
					data-dtype="Number"
					min="0"
					max="999"
					oninput="validity.valid || (value=${value})"
					placeholder="0"
				>
			</div>
		`;
		const belowThis = html[0].querySelector(".tab.attributes.flexrow .counters div.counter.flexrow.exhaustion");
		belowThis.parentNode.insertBefore(materia, belowThis.nextSibling);
	}
	
	static create_dots = (sheet, html) => {
		const limited_use_dots = !!game.settings.get(MODULE_NAME, "colorSettings").limited_use_dots;
		const spell_slot_dots = !!game.settings.get(MODULE_NAME, "colorSettings").spell_slot_dots;
		
		// create spell slot dots.
		if(spell_slot_dots){
			const options = ["pact", "spell1", "spell2", "spell3", "spell4",
				"spell5", "spell6", "spell7", "spell8", "spell9"];
			for(let o of options){
				const max = html.find(`.spell-max[data-level=${o}]`);
				const name = max.closest(".spell-slots");
				const data = sheet.object.system.spells[o];
				if(data.max === 0) continue;
				let contents = "";
				for(let i = data.max; i > 0; i--){
					if(i <= data.value) contents += `<span class="dot"></span>`;
					else contents += `<span class="dot empty"></span>`;
				}
				name.before(contents);
			}
		}
		
		// create limited use dots.
		if(limited_use_dots){
			const itemUses = sheet.object.items.filter(i => !!i.hasLimitedUses);
			for(let o of itemUses){
				const itemHTML = html.find(`.item[data-item-id=${o.id}]`);
				let name = itemHTML.find(".item-name");
				const {value, max} = o.system.uses;
				if(max === 0) continue;
				let contents = "";
				for(let i = max; i > 0; i--){
					if(i <= value) contents += `<span class="dot"></span>`;
					else contents += `<span class="dot empty"></span>`;
				}
				if(o.type === "spell"){
					name = name.find(".item-detail.spell-uses");
					name.before(contents);
				}
				else name.after(contents);
			}
		}
		
		// create listeners.
		if(spell_slot_dots || limited_use_dots){
			for(let dot of html[0].querySelectorAll(".dot")){
				dot.addEventListener("click", async (ev) => {
					const actor = sheet.object;
					const li = $(ev.currentTarget).parents(".item");
					const item = actor.items.get(li.data("itemId"));

					// if it is not an item, find spell level and update spell slots.
					if(!item){
						const spellLevel = ev.currentTarget.parentElement.outerHTML.match(/data-level="(.*?)"/)[1];
						if(!!spellLevel){
							const path = `system.spells.${spellLevel}.value`;
							const {value} = actor.system.spells[spellLevel]
							const diff = ev.currentTarget.classList.contains("empty") ? 1 : -1;
							return actor.update({[path]: value + diff});
						}
					}

					// it's an item, update uses.
					else{
						const {value} = item.system.uses;
						const diff = ev.currentTarget.classList.contains("empty") ? 1 : -1;
						return item.update({"system.uses.value": value + diff});
					}
				});
			}
		}
	}
	
	static create_toggle_on_attunement_button = (sheet, html) => {
		html[0].addEventListener("click", (event) => {
			const attunement_icon = event.target?.closest(".item-detail.attunement");
			if(!attunement_icon) return;
			
			// item attuned or nah.
			const attuned = attunement_icon.querySelector(".attuned");
			const not_attuned = attunement_icon.querySelector(".not-attuned");
			if(!attuned && !not_attuned) return;
			
			// get item id.
			const itemId = attunement_icon.closest(".item").dataset.itemId;
			if(!itemId) return;
			
			// get the item.
			const item = sheet.actor.items.get(itemId);
			if(!item) return;
			
			if(!!attuned){
				item.update({"system.attunement": CONFIG.DND5E.attunementTypes.REQUIRED});
			}
			else if(!!not_attuned){
				item.update({"system.attunement": CONFIG.DND5E.attunementTypes.ATTUNED});
			}
		});
	}
	
	static color_magic_items = (sheet, html) => {
		const items = html[0].querySelectorAll(".items-list .item");
		for(let i of items){
			const id = i.outerHTML.match(/data-item-id="(.*?)"/);
			if(!id) continue;
			const rarity = sheet.object.items.get(id[1]).system?.rarity;
			if(rarity !== "" && rarity !== undefined) i.classList.add(rarity.slugify().toLowerCase());
		}
	}
	
	static refreshColors = () => {
		// set icon colors on sheet.
		const [
			a, b, cf, ca, cna, ce, cne, cp, cnp, cap, prof, half_prof, twice_prof
		] = Object.values(game.settings.get(MODULE_NAME, "colorSettings"));
		document.documentElement.style.setProperty("--full_color", cf);
		document.documentElement.style.setProperty("--attuned_color", ca);
		document.documentElement.style.setProperty("--not_attuned_color", cna);
		document.documentElement.style.setProperty("--equipped_color", ce);
		document.documentElement.style.setProperty("--not_equipped_color", cne);
		document.documentElement.style.setProperty("--prepared_color", cp);
		document.documentElement.style.setProperty("--not_prepared_color", cnp);
		document.documentElement.style.setProperty("--always_prepared_color", cap);
		document.documentElement.style.setProperty("--color_proficient", prof);
		document.documentElement.style.setProperty("--color_half_proficient", half_prof);
		document.documentElement.style.setProperty("--color_twice_proficient", twice_prof);
		
		// set item rarity colors on sheet.
		const {
			uncommon, rare, very_rare, legendary, artifact
		} = game.settings.get(MODULE_NAME, "rarityColorSettings");
		document.documentElement.style.setProperty("--rarity-color-uncommon", uncommon);
		document.documentElement.style.setProperty("--rarity-color-rare", rare);
		document.documentElement.style.setProperty("--rarity-color-very-rare", very_rare);
		document.documentElement.style.setProperty("--rarity-color-legendary", legendary);
		document.documentElement.style.setProperty("--rarity-color-artifact", artifact);
	}

	static set_hp_color = (sheet, html) => {
		const actor = sheet.object;
		const {value, max} = actor.system.attributes.hp;
		const nearDeath = (Math.abs(value) ?? 0)/(max ?? 1) < 0.33;
		const bloodied = (Math.abs(value) ?? 0)/(max ?? 1) < 0.66;
		
		const hp = html[0].querySelector("input[name='system.attributes.hp.value']");
		if(nearDeath){
			hp.classList.add("near-death");
			hp.classList.remove("bloodied");
		}
		else if(bloodied){
			hp.classList.remove("near-death");
			hp.classList.add("bloodied");
		}
		else{
			hp.classList.remove("near-death");
			hp.classList.remove("bloodied");
		}
	}

	// disable exhaustion, since that's overridden in effects.
	static disable_exhaustion = (sheet, html) => {
		html[0].querySelector(".counter.flexrow.exhaustion .counter-value input")?.setAttribute("disabled", "");
	}

	// pretty up the trait selectors.
	static pretty_trait_selector = (selector, html, context) => {
		if(!game.settings.get(MODULE_NAME, "sheetSettings").pretty_trait_selector) return;
		if([
			"system.traits.languages",
			"system.traits.di",
			"system.traits.dr",
			"system.traits.dv",
			"system.traits.ci"
		].includes(selector.attribute)){
			html[0].querySelector(".trait-list").classList.add("flexrow");
			html[0].querySelector(".trait-list").classList.add("innil-traits");
			html.css("height", "auto");
		}
		else if([
			"system.traits.toolProf",
			"system.traits.armorProf"
		].includes(selector.attribute)){
			html[0].querySelector(".trait-list").classList.add("flexcol");
			html[0].querySelector(".trait-list").classList.add("innil-profs");
			html.css("height", "auto");
			html.css("width", "auto");
		}
		else if([
			"system.traits.weaponProf"
		].includes(selector.attribute)){
			html[0].querySelector(".trait-list").classList.add("flexrow");
			html[0].querySelector(".trait-list").classList.add("innil-weapons");
			html.css("height", "auto");
			html.css("width", "auto");
		}
	}

	// makes headers collapsible.
	static collapsible_headers = (sheet, html) => {
		if(!game.settings.get(MODULE_NAME, "sheetSettings").collapsible_headers) return;

		// get the headers.
		const headers = html[0].querySelectorAll(".dnd5e .items-list .items-header h3");
		const bioHeaders = html[0].querySelectorAll(".dnd5e.sheet.actor .characteristics label");
	
		// for each header: add listener, and set initial display type.
		for(let header of headers){
			const itemHeader = header.closest(".items-header.flexrow");
			if(!itemHeader) continue;

			// apply collapse class for hover effect.
			itemHeader.classList.toggle("innil-header-collapse");
			
			// read from sheet whether no-create should be applied immediately.
			const applyNoCreate = !!foundry.utils.getProperty(sheet, `section-visibility.${header.innerText}`);
			
			// initially add 'no-create' class if applicable.
			if(applyNoCreate) itemHeader.classList.toggle("no-create");
	
			// set up listeners to change display.
			header.addEventListener("click", (event) => {
				const currentDisplay = !!foundry.utils.getProperty(sheet, `section-visibility.${header.innerText}`);
				foundry.utils.setProperty(sheet, `section-visibility.${event.target.innerText}`, !currentDisplay);
				itemHeader.classList.toggle("no-create");
			});
		}
		for(let header of bioHeaders){
			// read from sheet, should be collapsed?
			const collapsed = !!foundry.utils.getProperty(sheet, `section-visibility.${header.innerText}`);
			// add initial 'no-edit' class if true.
			if(collapsed) header.classList.toggle("no-edit");
			// set up listeners to toggle.
			header.addEventListener("click", (event) => {
				const currentDisplay = !!foundry.utils.getProperty(sheet, `section-visibility.${header.innerText}`);
				foundry.utils.setProperty(sheet, `section-visibility.${event.target.innerText}`, !currentDisplay);
				header.classList.toggle("no-edit");
			});
		}
	
	}
}
