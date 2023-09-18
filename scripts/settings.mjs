import { COLOR_DEFAULTS, MODULE } from "./const.mjs";
import { ColorationMenu } from "./modules/applications/settingsMenu.mjs";
import { SheetEdits } from "./modules/applications/sheetEdits.mjs";

export default class ModuleSettings {
  static init() {
    ModuleSettings._registerSettings();
    ModuleSettings._registerSettingsMenus();
  }

  static _registerSettings() {
    game.settings.register(MODULE, "markDefeatedCombatants", {
      name: "INNIL.SettingsCombatantDefeated",
      hint: "INNIL.SettingsCombatantDefeatedHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
      requiresReload: true,
    });

    game.settings.register(MODULE, "displaySavingThrowAmmo", {
      name: "INNIL.SettingsDisplayAmmo",
      hint: "INNIL.SettingsDisplayAmmoHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
      requiresReload: true,
    });

    // Whether to track reactions.
    game.settings.register(MODULE, "trackReactions", {
      name: "INNIL.SettingsTrackReactions",
      hint: "INNIL.SettingsTrackReactionsHint",
      scope: "world",
      config: true,
      type: Number,
      default: 1,
      requiresReload: true,
      choices: {
        0: "INNIL.SettingsTrackReactionsChoice0", // none
        1: "INNIL.SettingsTrackReactionsChoice1", // gm only
        2: "INNIL.SettingsTrackReactionsChoice2", // all
      },
    });
  }

  static _registerSettingsMenus() {
    // Settings that change the colors on character sheets.
    game.settings.register(MODULE, "colorationSettings", {
      scope: "client",
      config: false,
      type: Object,
      default: COLOR_DEFAULTS,
      onChange: SheetEdits.refreshColors,
    });

    game.settings.registerMenu(MODULE, "colorationSettings", {
      name: "INNIL.SettingsMenuColorationSettings",
      hint: "INNIL.SettingsMenuColorationSettingsHint",
      label: "INNIL.SettingsMenuColorationSettings",
      icon: "fa-solid fa-paint-roller",
      type: ColorationMenu,
      restricted: false,
    });
  }
}
