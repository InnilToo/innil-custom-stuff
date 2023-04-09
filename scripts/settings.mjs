import {
  COLOR_DEFAULTS,
  MODULE,
  RARITY_DEFAULTS,
  WORLD_DEFAULTS,
} from "./const.mjs";
import { refreshColors } from "./modules/applications/sheetEdits.mjs";

export function registerSettings() {
  _registerSettings();
  _registerSettingsMenus();
}

function _registerSettings() {
  game.settings.register(MODULE, "markDefeatedCombatants", {
    name: "INNIL.SettingsCombatantDefeatedName",
    hint: "INNIL.SettingsCombatantDefeatedHint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true,
  });

  game.settings.register(MODULE, "displaySavingThrowAmmo", {
    name: "INNIL.SettingsDisplayAmmoName",
    hint: "INNIL.SettingsDisplayAmmoHint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true,
  });

  game.settings.register(MODULE, "trackReactions", {
    name: "INNIL.SettingsTrackReactionsName",
    hint: "INNIL.SettingsTrackReactionsHint",
    scope: "world",
    config: true,
    type: String,
    default: "all",
    requiresReload: true,
    choices: {
      disabled: "Do not track reactions",
      gm: "Track reactions for the GM",
      all: "Track reactions for all actors",
    },
  });
}

function _registerSettingsMenus() {
  // game additions, replacements, and tweaks.
  game.settings.register(MODULE, "worldSettings", {
    scope: "world",
    config: false,
    type: Object,
    default: WORLD_DEFAULTS,
    onChange: () => SettingsConfig.reloadConfirm({ world: true }),
  });

  game.settings.registerMenu(MODULE, "worldSettings", {
    name: "INNIL.SettingsMenuWorldSettingsName",
    hint: "INNIL.SettingsMenuWorldSettingsHint",
    label: "Settings Menu",
    icon: "fa-solid fa-atlas",
    type: SettingsSubmenu,
    restricted: true,
  });

  // sheet color settings.
  game.settings.register(MODULE, "colorSettings", {
    scope: "client",
    config: false,
    type: Object,
    default: COLOR_DEFAULTS,
    onChange: refreshColors,
  });

  game.settings.registerMenu(MODULE, "colorSettings", {
    name: "INNIL.SettingsMenuColorSettingsName",
    hint: "INNIL.SettingsMenuColorSettingsHint",
    label: "Sheet Color Settings",
    icon: "fa-solid fa-paint-roller",
    type: ColorPickerSubmenu,
    restricted: false,
  });

  // item rarity color settings.
  game.settings.register(MODULE, "rarityColorSettings", {
    scope: "client",
    config: false,
    type: Object,
    default: RARITY_DEFAULTS,
    onChange: refreshColors,
  });

  game.settings.registerMenu(MODULE, "rarityColorSettings", {
    name: "INNIL.SettingsMenuRarityColorsName",
    hint: "INNIL.SettingsMenuRarityColorsHint",
    label: "Item Rarity Color Settings",
    icon: "fa-solid fa-paint-roller",
    type: RarityColorsSubmenu,
    restricted: false,
  });
}

class SettingsSubmenu extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      popOut: true,
      width: 550,
      height: "auto",
      template: `modules/${MODULE}/templates/settingsMenu.hbs`,
      id: "innil-settings-submenu-additions-and-replacements",
      title: "Additions and Replacements",
      resizable: false,
      classes: [MODULE, "settings-menu"],
    });
  }

  async _updateObject(event, formData) {
    return game.settings.set(MODULE, "worldSettings", formData, {
      diff: false,
    });
  }

  async getData() {
    const data = foundry.utils.mergeObject(
      WORLD_DEFAULTS,
      game.settings.get(MODULE, "worldSettings"),
      { insertKeys: false }
    );
    const settings = Object.entries(data).map((s) => {
      return {
        id: s[0],
        checked: s[1],
        name: `INNIL.SettingsWorld${s[0].capitalize()}Name`,
        hint: `INNIL.SettingsWorld${s[0].capitalize()}Hint`,
      };
    });
    return { settings };
  }
}

class ColorPickerSubmenu extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: [MODULE, "settings-menu"],
      popOut: true,
      width: 550,
      height: "auto",
      template: `modules/${MODULE}/templates/settingsColorpickers.hbs`,
      id: "innil-settings-submenu-colorpickers",
      title: "Character Sheet Color Adjustments",
      resizable: false,
    });
  }

  async _updateObject(event, formData) {
    return game.settings.set(MODULE, "colorSettings", formData, {
      diff: false,
    });
  }

  async getData() {
    const data = foundry.utils.mergeObject(
      foundry.utils.deepClone(COLOR_DEFAULTS),
      game.settings.get(MODULE, "colorSettings"),
      { insertKeys: false }
    );
    const checks = Object.entries({
      showLimitedUses: data.showLimitedUses,
      showSpellSlots: data.showSpellSlots,
    }).map((s) => {
      return {
        id: s[0],
        checked: s[1],
        name: `INNIL.SettingsColor${s[0].capitalize()}Name`,
        hint: `INNIL.SettingsColor${s[0].capitalize()}Hint`,
      };
    });
    delete data.showLimitedUses;
    delete data.showSpellSlots;

    const colors = Object.entries(data).map((s) => {
      return {
        id: s[0],
        value: s[1],
        name: `INNIL.SettingsColor${s[0].capitalize()}Name`,
        hint: `INNIL.SettingsColor${s[0].capitalize()}Hint`,
      };
    });
    return { checks, colors };
  }
}

class RarityColorsSubmenu extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: [MODULE, "settings-menu"],
      popOut: true,
      width: 550,
      height: "auto",
      template: `modules/${MODULE}/templates/settingsRaritycolors.hbs`,
      id: "innil-settings-submenu-raritycolors",
      title: "Item Rarity Color Adjustments",
      resizable: false,
    });
  }

  async _updateObject(event, formData) {
    const set = await game.settings.set(
      MODULE,
      "rarityColorSettings",
      formData,
      { diff: false }
    );
    refreshColors();
    return set;
  }

  async getData() {
    return {
      settings: Object.entries(
        foundry.utils.mergeObject(
          RARITY_DEFAULTS,
          game.settings.get(MODULE, "rarityColorSettings"),
          { insertKeys: false }
        )
      ).map((d) => {
        const label = CONFIG.DND5E.itemRarity[d[0]].titleCase();
        const name = d[0];
        const color = d[1];
        return { label, name, color };
      }),
    };
  }
}
