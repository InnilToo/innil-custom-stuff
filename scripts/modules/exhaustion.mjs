import { MODULE } from "../const.mjs";

export class ExhaustionHandler {
  /**
   * Set exhaustion to a specific level, or adjust it up or down.
   * @param {number} [num=0]              The level to set exhaustion to.
   * @returns {Promise<ActiveEffect>}     The active effect that is updated, created, or deleted.
   */
  static async applyExhaustion(num = 0) {
    // Get current exhaustion effect, if any.
    const exhaustion = this.effects.find((i) => i.statuses.has("exhaustion"));

    // Remove all exhaustion by providing '0'.
    if (num < 1) return exhaustion?.delete();

    // Set exhaustion to a specific level, to a maximum of 10. If already at 10, delete it, and apply 'dead'.
    if (num > 10) {
      // Delete and apply 'dead'.
      await exhaustion?.delete();
      const dead = foundry.utils.deepClone(CONFIG.statusEffects.find((e) => e.id === CONFIG.specialStatusEffects.DEFEATED));
      foundry.utils.mergeObject(dead, {
        statuses: [dead.id],
        name: game.i18n.localize(dead.name),
        "flags.core.overlay": true,
      });
      this.update({
        [`system.attributes.hp.value`]: 0,
      });
      return this.createEmbeddedDocuments("ActiveEffect", [dead]);
    } else {
      // Create a new effect or update a current one to a new level.
      const data = {
        name: game.i18n.localize("INNIL.StatusConditionExhaustion"),
        statuses: ["exhaustion"],
        description: `<p>${game.i18n.format("INNIL.StatusConditionExhaustionDescription", { level: num })}</p>`,
        "flags.innil-custom-stuff.exhaustion": num,
        icon: "icons/skills/wounds/injury-body-pain-gray.webp",
        changes: [
          {
            key: "system.bonuses.abilities.save",
            mode: CONST.ACTIVE_EFFECT_MODES.ADD,
            value: "-@attributes.exhaustion",
          },
          {
            key: "system.bonuses.abilities.check",
            mode: CONST.ACTIVE_EFFECT_MODES.ADD,
            value: "-@attributes.exhaustion",
          },
          {
            key: "system.bonuses.mwak.attack",
            mode: CONST.ACTIVE_EFFECT_MODES.ADD,
            value: "-@attributes.exhaustion",
          },
          {
            key: "system.bonuses.rwak.attack",
            mode: CONST.ACTIVE_EFFECT_MODES.ADD,
            value: "-@attributes.exhaustion",
          },
          {
            key: "system.bonuses.msak.attack",
            mode: CONST.ACTIVE_EFFECT_MODES.ADD,
            value: "-@attributes.exhaustion",
          },
          {
            key: "system.bonuses.rsak.attack",
            mode: CONST.ACTIVE_EFFECT_MODES.ADD,
            value: "-@attributes.exhaustion",
          },
          {
            key: "system.bonuses.spell.dc",
            mode: CONST.ACTIVE_EFFECT_MODES.ADD,
            value: "-@attributes.exhaustion",
          },
          {
            key: "system.attributes.exhaustion",
            mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
            value: num,
          },
        ],
      };
      if (exhaustion) return exhaustion.update(data);
      return this.createEmbeddedDocuments("ActiveEffect", [data]);
    }
  }

  /**
   * Append the exhaustion methods to the actor prototype.
   */
  static init() {
    Actor.prototype.applyExhaustion = ExhaustionHandler.applyExhaustion;
    Hooks.on("dnd5e.restCompleted", ExhaustionHandler._longRestExhaustionReduction);
  }

  /**
   * Reduce exhaustion on a long rest.
   * @param {Actor} actor                 The actor taking a rest.
   * @param {object} data                 The rest data.
   * @returns {Promise<ActiveEffect>}     The updated or deleted active effect.
   */
  static async _longRestExhaustionReduction(actor, data) {
    if (!data.longRest) return;

    // New exhaustion level:
    const level = actor.effects.find((e) => e.statuses.has("exhaustion"))?.flags[MODULE].exhaustion ?? 0;
    return actor.applyExhaustion(level - 1);
  }
}
