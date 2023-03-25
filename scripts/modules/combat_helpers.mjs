import { MODULE_NAME } from "../const.mjs";

export class INNIL_COMBAT {
  // hooks on updateToken
  // mark defeated combatant as dead unless it's linked and/or player owned
  static mark_defeated_combatant = async (tokenDoc, updates) => {
    if (!game.settings.get(MODULE_NAME, "markDefeatedCombatants")) return;
    if (tokenDoc.actor.hasPlayerOwner) return;
    const hpUpdate = foundry.utils.getProperty(updates, "actorData.system.attributes.hp.value");
    if (hpUpdate === undefined) return;
    if (hpUpdate > 0) {
      await tokenDoc.actor.effects.find((i) => i.getFlag("core", "statusId") === "dead")?.delete();
      await tokenDoc.combatant.update({ defeated: false });
    } else {
      const effect = CONFIG.statusEffects.find((i) => i.id === "dead");
      await tokenDoc.object.toggleEffect(effect, { overlay: true });
      await tokenDoc.combatant.update({ defeated: true });
    }
  };

  // hooks on dnd5e.rollAttack
  // display saving throw on shot ammo
  static show_ammo_if_it_has_save = async (weapon, roll, ammoUpdate) => {
    if (!game.settings.get(MODULE_NAME, "displaySavingThrowAmmo")) return;
    if (!ammoUpdate.length) return;
    const ammoId = ammoUpdate[0]._id;
    const ammo = weapon.actor.items.get(ammoId);
    if (ammo.hasSave) return ammo.displayCard();
    return;
  };

  // hooks on dnd5e.useItem
  // spend actors/tokens reaction
  static spendReaction(item) {
    if (item.system.activation?.type !== "reaction") return;
    if (!game.combat) return;
    const has = item.parent.effects.find((e) => e.flags.core?.statusId === "reaction");
    if (has) return;
    const combatant = item.parent.token?.combatant ?? item.parent.getActiveTokens()[0]?.combatant;
    if (!combatant) return;
    const reaction = foundry.utils.duplicate(CONFIG.statusEffects.find((e) => e.id === "reaction"));
    reaction["flags.visual-active-effects.data"] = {
      intro: "<p>" + game.i18n.format("INNIL.StatusConditionReactionDescription", { name: item.name }) + "</p>",
      content: item.system.description.value,
    };
    return combatant.token.toggleActiveEffect(reaction, { active: true });
  }
}

export function _replaceTokenHUD(hud, html, tokenData) {
  const sorting = CONFIG.statusEffects.reduce((acc, e) => {
    acc[e.id] = e.sort;
    return acc;
  }, {});
  const innerHTML = Object.values(tokenData.statusEffects)
    .sort((a, b) => {
      return sorting[a.id] - sorting[b.id];
    })
    .reduce((acc, eff) => {
      const condition = CONFIG.statusEffects.find((e) => e.id === eff.id) ?? {};
      const clss = "status-effect effect-control";
      const atts = (eff.isActive ? "active" : "") + " " + (eff.isOverlay ? "overlay" : "");
      const tooltip = foundry.utils.getProperty(condition, "flags.visual-active-effects.data.intro") ?? "";
      return (
        acc +
        `
    <div src="${eff.src}" class="${clss} ${atts}" data-status-id="${eff.id}" data-tooltip="${tooltip}">
      <img class="status-effect-img" src="${eff.src}">
      <div class="status-effect-label">${eff.title}</div>
    </div>`
      );
    }, "");
  html[0].querySelector(".status-effects").innerHTML = innerHTML;
}
