import { MODULE_NAME } from "../const.mjs";

export class INNIL_SHEET {
  // Disable Long Rest.
  static disable_long_rest = (dialog, html, data) => {
    const restDisabled = game.settings.get(MODULE_NAME, "toggleLR");
    if (!restDisabled) return;

    const restButton = html[0].querySelector("button[data-button='rest']");
    restButton.setAttribute("disabled", true);
  };

  // Disable Short Rest.
  static disable_short_rest = (dialog, html, data) => {
    const restDisabled = game.settings.get(MODULE_NAME, "toggleSR");
    if (!restDisabled) return;

    const rollButton = html[0].querySelector("#roll-hd");
    rollButton.setAttribute("disabled", true);
    const restButton = html[0].querySelector("button[data-button='rest']");
    restButton.setAttribute("disabled", true);
  };

  // Rename Long Rest to LR and Short Rest to SR.
  static rename_rest_labels = (sheet, html, sheetData) => {
    if (!game.settings.get(MODULE_NAME, "sheetSettings").rename_rest_labels) return;
    const SR = html[0].querySelector(".sheet-header .attributes a.rest.short-rest");
    const LR = html[0].querySelector(".sheet-header .attributes a.rest.long-rest");
    if (SR) SR.innerHTML = "SR";
    if (LR) LR.innerHTML = "LR";
  };

  // Rename copper, etc etc, to CP, SP, EP, GP, PP.
  static rename_currency_labels = (sheet, html, sheetData) => {
    if (!game.settings.get(MODULE_NAME, "replacementSettings").rename_currency_labels) return;
    for (let d of ["cp", "ep", "gp", "pp", "sp"]) {
      CONFIG.DND5E.currencies[d].label = d.toUpperCase();
    }
  };

  // Remove the 3 resources under Attributes.
  static remove_resources = (sheet, html, sheetData) => {
    if (!game.settings.get(MODULE_NAME, "sheetSettings").remove_resources) return;
    const resources = html[0].querySelector("section > form > section > div.tab.attributes.flexrow > section > ul");
    if (resources) resources.remove();
  };

  // Remove alignment.
  static remove_alignment = (sheet, html, sheetData) => {
    if (!game.settings.get(MODULE_NAME, "sheetSettings").remove_alignment) return;
    const AL = html[0].querySelector("input[name='system.details.alignment']");
    if (AL) AL.parentElement?.remove();
  };

  // Disable the initiative button so it's not clickable.
  static disable_initiative_button = (sheet, html, sheetData) => {
    if (!game.settings.get(MODULE_NAME, "sheetSettings").disable_initiative_button) return;
    const initButton = html[0].querySelector(".dnd5e.sheet.actor .sheet-header .attributes .attribute.initiative > h4");
    if (initButton) {
      initButton.classList.remove("rollable");
      initButton.removeAttribute("data-action");
    }
  };

  // BEGIN USES DOTS
  // Create dots.
  static create_dots = (sheet, html) => {
    const limited_use_dots = !!game.settings.get(MODULE_NAME, "colorSettings").limited_use_dots;
    const spell_slot_dots = !!game.settings.get(MODULE_NAME, "colorSettings").spell_slot_dots;

    // Create spell slot dots.
    if (spell_slot_dots) {
      const options = [
        "pact",
        "spell1",
        "spell2",
        "spell3",
        "spell4",
        "spell5",
        "spell6",
        "spell7",
        "spell8",
        "spell9",
      ];
      const data = sheet.object.system.spells;
      for (const o of options) {
        const max = html[0].querySelector(`.spell-max[data-level=${o}]`);
        if (!max) continue;
        const beforeThis = max.closest(".spell-slots");
        if (data[o].max === 0) continue;
        for (let i = data[o].max; i > 0; i--) {
          let span = document.createElement("SPAN");
          beforeThis.insertAdjacentElement("beforeBegin", span);
          if (i <= data[o].value) span.classList.add("dot");
          else span.classList.add("dot", "empty");
        }
      }
    }

    // Create limited use dots.
    if (limited_use_dots) {
      const itemUses = sheet.object.items.filter((i) => !!i.hasLimitedUses);
      for (const o of itemUses) {
        const { value, max } = o.system.uses;
        if (max === 0) continue;
        const itemHTML = html[0].querySelector(`.item[data-item-id='${o.id}']`);
        // Skip if item is hidden via filter.
        if (!itemHTML) continue;
        const position = o.type === "spell" ? "beforeBegin" : "afterEnd";
        const adjacent =
          o.type === "spell" ? itemHTML.querySelector(".item-detail.spell-uses") : itemHTML.querySelector(".item-name");
        if (o.type !== "spell") {
          const dotContainer = document.createElement("DIV");
          dotContainer.classList.add("innil-dots", "flexrow");
          dotContainer.innerHTML =
            Array.fromRange(Math.min(10, max)).reduce((acc, e) => {
              if (e < value) return acc + `<span class="dot"></span>`;
              else return acc + `<span class="dot empty"></span>`;
            }, ``) + (max > 10 ? `<span class="dot ${value < max ? "empty" : ""} has-more"></span>` : "");
          adjacent.insertAdjacentElement(position, dotContainer);
        } else {
          const dotContainer = document.createElement("DIV");
          dotContainer.classList.add("innil-dots", "flexrow");
          dotContainer.innerHTML =
            Array.fromRange(Math.min(5, max)).reduce((acc, e) => {
              if (e < value) return acc + `<span class="dot"></span>`;
              else return acc + `<span class="dot empty"></span>`;
            }, ``) + (max > 5 ? `<span class="dot ${value < max ? "empty" : ""} has-more"></span>` : "");
          adjacent.insertAdjacentElement(position, dotContainer);
        }
      }
    }

    // Create listeners.
    if (spell_slot_dots || limited_use_dots) {
      for (let dot of html[0].querySelectorAll(".dot")) {
        dot.addEventListener("click", async (ev) => {
          const actor = sheet.object;
          const li = $(ev.currentTarget).parents(".item");
          const item = actor.items.get(li.data("itemId"));

          // if it is not an item, find spell level and update spell slots.
          if (!item) {
            const spellLevel = ev.currentTarget.parentElement.outerHTML.match(/data-level="(.*?)"/)[1];
            if (!!spellLevel) {
              const path = `system.spells.${spellLevel}.value`;
              const { value } = actor.system.spells[spellLevel];
              const diff = ev.currentTarget.classList.contains("empty") ? 1 : -1;
              return actor.update({ [path]: value + diff });
            }
          }

          // It's an item, update uses.
          else {
            const { value } = item.system.uses;
            const diff = ev.currentTarget.classList.contains("empty") ? 1 : -1;
            return item.update({
              "system.uses.value": value + diff,
            });
          }
        });
      }
    }
  };
  // END USES DOTS

  static create_toggle_on_attunement_button = (sheet, html) => {
    html[0].addEventListener("click", (event) => {
      const attunement_icon = event.target?.closest(".item-detail.attunement");
      if (!attunement_icon) return;

      // Item attuned or nah.
      const attuned = attunement_icon.querySelector(".attuned");
      const not_attuned = attunement_icon.querySelector(".not-attuned");
      if (!attuned && !not_attuned) return;

      // Get item id.
      const itemId = attunement_icon.closest(".item").dataset.itemId;
      if (!itemId) return;

      // Get the item.
      const item = sheet.actor.items.get(itemId);
      if (!item) return;

      if (!!attuned) {
        item.update({
          "system.attunement": CONFIG.DND5E.attunementTypes.REQUIRED,
        });
      } else if (!!not_attuned) {
        item.update({
          "system.attunement": CONFIG.DND5E.attunementTypes.ATTUNED,
        });
      }
    });
  };

  static color_magic_items = (sheet, html) => {
    const items = html[0].querySelectorAll(".items-list .item");
    for (let i of items) {
      const id = i.outerHTML.match(/data-item-id="(.*?)"/);
      if (!id) continue;
      const rarity = sheet.object.items.get(id[1]).system?.rarity;
      if (rarity !== "" && rarity !== undefined) i.classList.add(rarity.slugify().toLowerCase());
    }
  };

  static refreshColors = () => {
    // set icon colors on sheet.
    const [a, b, cf, ca, cna, ce, cne, cp, cnp, cap, prof, half_prof, twice_prof] = Object.values(
      game.settings.get(MODULE_NAME, "colorSettings")
    );
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
    const { uncommon, rare, very_rare, legendary, artifact } = game.settings.get(MODULE_NAME, "rarityColorSettings");
    document.documentElement.style.setProperty("--rarity-color-uncommon", uncommon);
    document.documentElement.style.setProperty("--rarity-color-rare", rare);
    document.documentElement.style.setProperty("--rarity-color-very-rare", very_rare);
    document.documentElement.style.setProperty("--rarity-color-legendary", legendary);
    document.documentElement.style.setProperty("--rarity-color-artifact", artifact);
  };

  // pretty up the trait selectors.
  static pretty_trait_selector = (selector, html, context) => {
    if (!game.settings.get(MODULE_NAME, "sheetSettings").pretty_trait_selector) return;
    if (
      [
        "system.traits.languages",
        "system.traits.di",
        "system.traits.dr",
        "system.traits.dv",
        "system.traits.ci",
      ].includes(selector.attribute)
    ) {
      html[0].querySelector(".trait-list").classList.add("flexrow");
      html[0].querySelector(".trait-list").classList.add("innil-traits");
      html.css("height", "auto");
    } else if (["system.traits.toolProf", "system.traits.armorProf"].includes(selector.attribute)) {
      html[0].querySelector(".trait-list").classList.add("flexcol");
      html[0].querySelector(".trait-list").classList.add("innil-profs");
      html.css("height", "auto");
      html.css("width", "auto");
    } else if (["system.traits.weaponProf"].includes(selector.attribute)) {
      html[0].querySelector(".trait-list").classList.add("flexrow");
      html[0].querySelector(".trait-list").classList.add("innil-weapons");
      html.css("height", "auto");
      html.css("width", "auto");
    }
  };

  // makes headers collapsible.
  static collapsible_headers = (sheet, html) => {
    if (!game.settings.get(MODULE_NAME, "sheetSettings").collapsible_headers) return;

    // get the headers.
    const headers = html[0].querySelectorAll(".dnd5e .items-list .items-header h3");
    const bioHeaders = html[0].querySelectorAll(".dnd5e.sheet.actor .characteristics label");

    // for each header: add listener, and set initial display type.
    for (let header of headers) {
      const itemHeader = header.closest(".items-header.flexrow");
      if (!itemHeader) continue;

      // apply collapse class for hover effect.
      itemHeader.classList.toggle("innil-header-collapse");

      // read from sheet whether no-create should be applied immediately.
      const applyNoCreate = !!foundry.utils.getProperty(sheet, `section-visibility.${header.innerText}`);

      // initially add 'no-create' class if applicable.
      if (applyNoCreate) itemHeader.classList.toggle("no-create");

      // set up listeners to change display.
      header.addEventListener("click", (event) => {
        const currentDisplay = !!foundry.utils.getProperty(sheet, `section-visibility.${header.innerText}`);
        foundry.utils.setProperty(sheet, `section-visibility.${event.target.innerText}`, !currentDisplay);
        itemHeader.classList.toggle("no-create");
      });
    }
    for (let header of bioHeaders) {
      // read from sheet, should be collapsed?
      const collapsed = !!foundry.utils.getProperty(sheet, `section-visibility.${header.innerText}`);
      // add initial 'no-edit' class if true.
      if (collapsed) header.classList.toggle("no-edit");
      // set up listeners to toggle.
      header.addEventListener("click", (event) => {
        const currentDisplay = !!foundry.utils.getProperty(sheet, `section-visibility.${header.innerText}`);
        foundry.utils.setProperty(sheet, `section-visibility.${event.target.innerText}`, !currentDisplay);
        header.classList.toggle("no-edit");
      });
    }
  };
}
