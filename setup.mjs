import { setupAPI } from "./scripts/apiSetup.mjs";
import { MODULE } from "./scripts/const.mjs";
import {
  AnimationsHandler,
  _setupCollapsibles,
} from "./scripts/modules/animations.mjs";
import { DamageApplicator } from "./scripts/modules/applications/damageApplicator.mjs";
import { SheetEdits } from "./scripts/modules/applications/sheetEdits.mjs";
import { CombatEnhancements } from "./scripts/modules/combatHelpers.mjs";
import { ExhaustionHandler } from "./scripts/modules/exhaustion.mjs";
import { GameChangesHandler } from "./scripts/modules/gameChanges.mjs";
import { SocketsHandler } from "./scripts/modules/sockets.mjs";
import { registerSettings } from "./scripts/settings.mjs";

Hooks.once("init", registerSettings);
Hooks.once("init", setupAPI);
Hooks.once("init", GameChangesHandler._visionModes);
Hooks.once("init", GameChangesHandler._setUpGameChanges);
Hooks.once("ready", SheetEdits.refreshColors);
Hooks.once("ready", SocketsHandler.socketsOn);
Hooks.once("ready", _setupCollapsibles);
Hooks.once("setup", GameChangesHandler._miscAdjustments);
Hooks.once("setup", ExhaustionHandler._appendActorMethods);

Hooks.on(
  "dnd5e.getItemContextOptions",
  GameChangesHandler._addContextMenuOptions
);
Hooks.on("dnd5e.preRollDamage", DamageApplicator._appendDamageRollData);
Hooks.on("dnd5e.restCompleted", GameChangesHandler._restItemDeletion);
Hooks.on("dnd5e.restCompleted", ExhaustionHandler._longRestExhaustionReduction);
Hooks.on("dropCanvasData", SocketsHandler._onDropData);
Hooks.on("preCreateActiveEffect", GameChangesHandler._preCreateActiveEffect);
Hooks.on("preUpdateToken", GameChangesHandler._rotateTokensOnMovement);
Hooks.on("renderActorSheet", SheetEdits._performSheetEdits);
Hooks.on("renderChatMessage", DamageApplicator._appendToDamageRolls);
Hooks.on("renderItemSheet", GameChangesHandler._itemStatusCondition);
Hooks.on("renderTokenHUD", GameChangesHandler._replaceTokenHUD);
Hooks.on("preCreateChatMessage", DamageApplicator._appendMoreDamageRollData);
Hooks.on("updateCombat", CombatEnhancements._rechargeMonsterFeatures);

Hooks.once("ready", function () {
  const reactionSetting = game.settings.get(MODULE, "trackReactions");
  if (
    (reactionSetting === "gm" && game.user.isGM) ||
    reactionSetting === "all"
  ) {
    Hooks.on("dnd5e.useItem", CombatEnhancements._spendReaction);
  }

  if (game.settings.get(MODULE, "displaySavingThrowAmmo")) {
    Hooks.on("dnd5e.rollAttack", CombatEnhancements._displaySavingThrowAmmo);
  }

  if (game.user.isGM) {
    if (game.settings.get(MODULE, "markDefeatedCombatants")) {
      Hooks.on("updateActor", CombatEnhancements._markDefeatedCombatant);
    }
    Hooks.on(
      "getSceneConfigHeaderButtons",
      GameChangesHandler._sceneHeaderView
    );
    Hooks.on("dropCanvasData", GameChangesHandler._dropActorFolder);
    Hooks.on("preCreateScene", GameChangesHandler._preCreateScene);
  }

  if (game.modules.get("visual-active-effects")?.active) {
    Hooks.on(
      "visual-active-effects.createEffectButtons",
      GameChangesHandler._visualActiveEffectsCreateEffectButtons
    );
  }

  // hook for various actions are performed to display animations.
  const canAnimate = ["sequencer", "jb2a_patreon"].every(
    (id) => !!game.modules.get(id)?.active
  );
  if (canAnimate) {
    Hooks.on(
      "createMeasuredTemplate",
      AnimationsHandler.onCreateMeasuredTemplate
    );
    Hooks.on("dnd5e.useItem", AnimationsHandler.onItemUse);
    Hooks.on("dnd5e.rollAttack", AnimationsHandler.onItemRollAttack);
    Hooks.on("dnd5e.rollDamage", AnimationsHandler.onItemRollDamage);
    Hooks.on("dnd5e.rollSkill", AnimationsHandler.onRollSkill);
  }
});
