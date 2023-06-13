import { MODULE } from "../const.mjs";

export class AnimationsHandler {
  // On template creation
  static onCreateMeasuredTemplate(templateDoc, _, userId) {
    if (userId !== game.user.id) return;

    const uuid = templateDoc.flags.dnd5e?.origin;
    if (!uuid) return;

    const item = fromUuidSync(uuid);
    if (!item || !(item instanceof Item)) return;

    const token = item.actor.token?.object ?? item.actor.getActiveTokens()[0];
    let check;

    // BREATH WEAPON.
    check = item.flags[MODULE]?.breathWeapon?.type;
    if (check) {
      const file = check;
      return new Sequence()
        .effect()
        .file(file)
        .atLocation(templateDoc)
        .stretchTo(templateDoc)
        .play({ remote: true });
    }

    // BURNING HANDS.
    check = item.name === "Burning Hands";
    if (check) {
      const file = "jb2a.burning_hands.01.orange";
      return new Sequence()
        .effect()
        .file(file)
        .atLocation(templateDoc)
        .stretchTo(templateDoc)
        .play({ remote: true });
    }

    // CALL LIGHTNING.
    check = item.name === "Call Lightning";
    if (check) {
      const file = "jb2a.lightning_strike.blue.0";
      return new Sequence()
        .effect()
        .file(file)
        .atLocation(templateDoc)
        .scale(2)
        .play({ remote: true });
    }

    // BLACK TENTACLES.
    check = item.name === "Black Tentacles";
    if (check) {
      const file = "jb2a.black_tentacles.dark_purple";
      return new Sequence()
        .effect()
        .file(file)
        .attachTo(templateDoc)
        .tieToDocuments(templateDoc)
        .persist()
        .play({ remote: true });
    }

    // FIREBALL.
    check = item.name === "Fireball";
    if (check) {
      const beam = "jb2a.fireball.beam.orange";
      const expl = "jb2a.fireball.explosion.orange";
      const seq = new Sequence();
      if (token)
        seq
          .effect()
          .file(beam)
          .atLocation(token)
          .stretchTo(templateDoc)
          .playbackRate(2)
          .waitUntilFinished();
      return seq
        .effect()
        .file(expl)
        .atLocation(templateDoc)
        .play({ remote: true });
    }

    // GRAVITY WAVE.
    check = item.name === "Gravity Wave";
    if (check) {
      const file = "jb2a.sphere_of_annihilation.600px.purplered";
      return new Sequence()
        .effect()
        .file(file)
        .attachTo(templateDoc)
        .tieToDocuments(templateDoc)
        .scale(2)
        .fadeIn(500)
        .persist()
        .play({ remote: true });
    }

    // LIGHTNING BOLT.
    check = item.name === "Lightning Bolt";
    if (check) {
      const file = "jb2a.lightning_bolt.wide.blue";
      return new Sequence()
        .effect()
        .file(file)
        .atLocation(templateDoc)
        .stretchTo(templateDoc)
        .play({ remote: true });
    }

    // SORROW'S EMBRACE.
    check = item.name === "Sorrow's Embrace";
    if (check) {
      const file = "jb2a.spirit_guardians.dark_black.ring";
      return new Sequence()
        .effect()
        .file(file)
        .attachTo(templateDoc)
        .tieToDocuments(templateDoc)
        .scale(2)
        .fadeIn(500)
        .persist()
        .play({ remote: true });
    }

    // STAR DUST.
    check = item.name === "Star Dust";
    if (check) {
      const file = "jb2a.side_impact.part.slow.star.pinkyellow";
      return new Sequence()
        .effect()
        .file(file)
        .atLocation(templateDoc)
        .stretchTo(templateDoc)
        .play({ remote: true });
    }
  }

  // On Item Attack roll
  static onItemRollAttack(item, roll, ammo) {
    const { name, actor } = item;
    if (!actor) return;

    const token = actor.token?.object ?? actor.getActiveTokens()[0];
    const target = game.user.targets.first();
    let check;

    // BOWS in general.
    check = ["shortbow", "longbow"].includes(item.system.baseItem);
    if (check) {
      if (!target || !token) return;
      const file = "jb2a.arrow.physical.white.01";
      return new Sequence()
        .effect()
        .stretchTo(target)
        .atLocation(token)
        .file(file)
        .play({ remote: true });
    }

    // CROSSBOWS in general.
    check = ["handcrossbow", "heavycrossbow", "lightcrossbow"].includes(
      item.system.baseItem
    );
    if (check) {
      if (!target || !token) return;
      const file = "jb2a.bolt.physical.white02";
      return new Sequence()
        .effect()
        .stretchTo(target)
        .atLocation(token)
        .file(file)
        .play({ remote: true });
    }

    // CRACKLE.
    check = name === "Crackle";
    if (check) {
      if (!target || !token) return;
      const file = "jb2a.chain_lightning.primary.blue";
      return new Sequence()
        .effect()
        .stretchTo(target)
        .atLocation(token)
        .file(file)
        .play({ remote: true });
    }

    // ELDRITCH BLAST.
    check = name === "Eldritch Blast";
    if (check) {
      if (!target || !token) return;
      const file = "jb2a.eldritch_blast";
      return new Sequence()
        .effect()
        .stretchTo(target)
        .atLocation(token)
        .file(file)
        .play({ remote: true });
    }

    // FIRE BOLT.
    check = name === "Fire Bolt";
    if (check) {
      if (!target || !token) return;
      const file = "jb2a.fire_bolt.orange";
      return new Sequence()
        .effect()
        .stretchTo(target)
        .atLocation(token)
        .file(file)
        .play({ remote: true });
    }

    // GUIDING BOLT.
    check = name === "Guiding Bolt";
    if (check) {
      if (!target || !token) return;
      const file = "jb2a.bullet";
      return new Sequence()
        .effect()
        .stretchTo(target)
        .atLocation(token)
        .file(file)
        .play({ remote: true });
    }

    // ICE KNIFE.
    check = name === "Ice Knife";
    if (check) {
      if (!target || !token) return;
      const file = "jb2a.spell_projectile.ice_shard.blue";
      return new Sequence()
        .effect()
        .file(file)
        .atLocation(token)
        .stretchTo(target)
        .play({ remote: true });
    }

    // LIGHTING SPEAR.
    check = name === "Lightning Spear";
    if (check) {
      if (!target || !token) return;
      const file = "jb2a.bolt.lightning.blue";
      return new Sequence()
        .effect()
        .stretchTo(target)
        .atLocation(token)
        .file(file)
        .playbackRate(2)
        .play({ remote: true });
    }

    // RADIANT FLAME.
    check = name === "Radiant Flame";
    if (check) {
      if (!target || !token) return;
      const file = "jb2a.chain_lightning.secondary.yellow";
      return new Sequence()
        .effect()
        .stretchTo(target)
        .atLocation(token)
        .file(file)
        .play({ remote: true });
    }

    // THUNDER PUNCH.
    check = name === "Thunder Punch";
    if (check) {
      if (!target || !token) return;
      const file = "jb2a.unarmed_strike.magical.01.blue";
      return new Sequence()
        .effect()
        .stretchTo(target)
        .atLocation(token)
        .file(file)
        .play({ remote: true });
    }
  }

  // On Item Damage roll
  static onItemRollDamage(item, roll) {
    const { name, actor } = item;
    if (!actor) return;

    const token = actor.token?.object ?? actor.getActiveTokens()[0];
    const target = game.user.targets.first();
    let check;

    // CURE WOUNDS.
    check = name === "Cure Wounds";
    if (check) {
      if (!target) return;
      const file = "jb2a.cure_wounds.400px";
      return new Sequence()
        .effect()
        .attachTo(target)
        .file(file)
        .scaleIn(0, 500)
        .play({ remote: true });
    }

    // DIVINE SMITE.
    check = name === "Divine Smite";
    if (check) {
      if (!target) return;
      const file = "jb2a.divine_smite.target.greenyellow";
      return new Sequence()
        .effect()
        .attachTo(target)
        .file(file)
        .play({ remote: true });
    }

    // ELDRITCH SMITE.
    check = name === "Eldritch Smite";
    if (check) {
      if (!target) return;
      const file = "jb2a.divine_smite.target.purplepink";
      return new Sequence()
        .effect()
        .attachTo(target)
        .file(file)
        .play({ remote: true });
    }

    // HEALING WORD.
    check = name === "Healing Word";
    if (check) {
      if (!target) return;
      const file = "jb2a.healing_generic.loop.tealyellow";
      return new Sequence()
        .effect()
        .attachTo(target)
        .file(file)
        .scaleIn(0, 500)
        .play({ remote: true });
    }

    // LIGHTNING TENDRIL.
    check = name === "Lightning Tendril";
    if (check) {
      if (!target || !token) return;
      const file = "jb2a.chain_lightning.secondary.blue";
      return new Sequence()
        .effect()
        .stretchTo(target)
        .atLocation(token)
        .file(file)
        .play({ remote: true });
    }
  }

  // On Item use
  static onItemUse(item) {
    const { name, actor } = item;
    if (!actor) return;

    const token = actor.token?.object ?? actor.getActiveTokens()[0];
    const target = game.user.targets.first();
    const targets = Array.from(game.user.targets);
    let check;

    // ACID SPLASH.
    check = name === "Acid Splash";
    if (check) {
      if (!target) return;
      const file = "jb2a.liquid.splash.green";
      return new Sequence()
        .effect()
        .file(file)
        .atLocation(target)
        .play({ remote: true });
    }

    // BLESS.
    check = name === "Bless";
    if (check) {
      const file = "jb2a.bless.400px.intro.yellow";
      targets.forEach((target) => {
        new Sequence()
          .effect()
          .file(file)
          .attachTo(target)
          .play({ remote: true });
      });
    }

    // CREATE OR DESTROY WATER.
    check = name === "Create or Destroy Water";
    if (check) {
      const file = "jb2a.liquid.splash.bright_blue";
      return new Sequence()
        .effect()
        .file(file)
        .attachTo(token)
        .play({ remote: true });
    }

    // DETECT MAGIC.
    check = name === "Detect Magic";
    if (check) {
      const file = "jb2a.detect_magic.circle";
      return new Sequence()
        .effect()
        .file(file)
        .attachTo(token)
        .play({ remote: true });
    }

    // DIVINE SENSE.
    check = name === "Divine Sense";
    if (check) {
      const file = "jb2a.token_border.circle.static.blue.001";
      return new Sequence()
        .effect()
        .file(file)
        .fadeIn(500)
        .duration(10000)
        .fadeOut(500)
        .attachTo(token)
        .play({ remote: true });
    }

    // HUNTER'S MARK.
    check = name === "Hunter's Mark";
    if (check) {
      if (!target) return;
      const file = "jb2a.hunters_mark.pulse.01.green";
      return new Sequence()
        .effect()
        .file(file)
        .atLocation(target)
        .play({ remote: true });
    }

    // HEX.
    check = name === "Hex";
    if (check) {
      if (!target) return;
      const file = "jb2a.magic_signs.rune.enchantment.intro.purple";
      return new Sequence()
        .effect()
        .file(file)
        .scale(0.5)
        .atLocation(target)
        .play({ remote: true });
    }

    // HEXBLADE'S CURSE.
    check = name === "Hexblade's Curse";
    if (check) {
      if (!target) return;
      const file = "jb2a.smoke.puff.centered.dark_black.0";
      return new Sequence()
        .effect()
        .file(file)
        .scale(0.5)
        .atLocation(target)
        .play({ remote: true });
    }

    // JEWEL OF THREE PRAYERS.
    check = name === "Jewel of Three Prayers";
    if (check) {
      const file = "jb2a.divine_smite.caster.reversed.blueyellow";
      return new Sequence()
        .effect()
        .file(file)
        .scale(1)
        .atLocation(token)
        .play({ remote: true });
    }

    // UNSETTLING PRESENCE.
    check = name === "Unsettling Presence";
    if (check) {
      const file = "jb2a.icon.fear.dark_purple";
      return new Sequence()
        .effect()
        .file(file)
        .fadeIn(500)
        .duration(3000)
        .fadeOut(500)
        .attachTo(token)
        .play({ remote: true });
    }

    // TOLL THE DEAD.
    check = name === "Toll the Dead";
    if (check) {
      if (!target) return;
      const file = "jb2a.toll_the_dead.purple.complete";
      return new Sequence()
        .effect()
        .file(file)
        .scale(0.5)
        .atLocation(target)
        .play({ remote: true });
    }

    // PALADIN AURA.
    check = name === "Aura of Protection";
    if (check) {
      if (!token) return;
      const name = `paladin-aura-${token.document.id}`;
      const file = "jb2a.extras.tmfx.border.circle.outpulse.01.normal";
      const has = Sequencer.EffectManager.getEffects({ name }).length > 0;
      if (has) return Sequencer.EffectManager.endEffects({ name });
      return new Sequence()
        .effect()
        .attachTo(token)
        .file(file)
        .persist()
        .name(name)
        .tint("#ff7300")
        .play({ remote: true });
    }
  }

  // On Skill roll
  static onRollSkill(actor, roll, skill) {
    const token = actor.token?.object ?? actor.getActiveTokens()[0];
    let check;

    // STEALTH.
    check = skill === "ste";
    if (check) {
      if (!token) return;
      const file = "jb2a.sneak_attack.";
      return new Sequence()
        .effect()
        .file(file)
        .attachTo(token)
        .play({ remote: true });
    }
  }
}
