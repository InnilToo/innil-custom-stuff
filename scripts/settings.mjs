import { COLOR_DEFAULTS, MODULE, WORLD_DEFAULTS } from "./const.mjs";
import {
  ColorationMenu,
  GameChangesMenu,
  IdentifiersMenu,
} from "./modules/applications/settingsMenu.mjs";
import { SheetEdits } from "./modules/applications/sheetEdits.mjs";

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

  // Whether to track reactions.
  game.settings.register(MODULE, "trackReactions", {
    name: "INNIL.SettingsTrackReactionsName",
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

function _registerSettingsMenus() {
  // Game additions, replacements, and tweaks.
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
    label: "INNIL.SettingsMenuWorldSettingsName",
    icon: "fa-solid fa-atlas",
    type: GameChangesMenu,
    restricted: true,
  });

  // Settings that change the colors on character sheets.
  game.settings.register(MODULE, "colorationSettings", {
    scope: "client",
    config: false,
    type: Object,
    default: COLOR_DEFAULTS,
    onChange: SheetEdits.refreshColors,
  });

  game.settings.registerMenu(MODULE, "colorationSettings", {
    name: "INNIL.SettingsMenuColorationSettingsName",
    hint: "INNIL.SettingsMenuColorationSettingsHint",
    label: "INNIL.SettingsMenuColorationSettingsName",
    icon: "fa-solid fa-paint-roller",
    type: ColorationMenu,
    restricted: false,
  });

  // Settings for various keys, ids, and uuids.
  game.settings.register(MODULE, "identifierSettings", {
    scope: "world",
    config: false,
    type: Object,
    default: {},
  });

  game.settings.registerMenu(MODULE, "identifierSettings", {
    name: "INNIL.SettingsMenuIdentifierSettingsName",
    hint: "INNIL.SettingsMenuIdentifierSettingsHint",
    label: "INNIL.SettingsMenuIdentifierSettingsName",
    icon: "fa-solid fa-key",
    type: IdentifiersMenu,
    restricted: true,
  });
}
