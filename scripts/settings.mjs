import { COLOR_DEFAULTS, MODULE, WORLD_DEFAULTS } from "./const.mjs";
import {
  ColorationMenu,
  GameChangesMenu,
  IdentifiersMenu,
} from "./modules/applications/settingsMenu.mjs";
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
    label: "INNIL.SettingsMenuWorldSettingsName",
    icon: "fa-solid fa-atlas",
    type: GameChangesMenu,
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
    label: "INNIL.SettingsMenuColorSettingsName",
    icon: "fa-solid fa-paint-roller",
    type: ColorationMenu,
    restricted: false,
  });

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
