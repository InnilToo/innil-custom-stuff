export class INNIL_ANIMATIONS {
	static onCreateMeasuredTemplate(templateDoc, _, userId) {
		if (userId !== game.user.id) return;

		const uuid = templateDoc.getFlag("dnd5e", "origin");
		if (!uuid) return;

		const item = fromUuidSync(uuid);
		if (!item || !(item instanceof Item)) return;

		let check;

		// BREATH WEAPON.
		check = item.getFlag("world", "breath-weapon.type");
		if (check) {
			const file = check;
			return new Sequence().effect().file(file).atLocation(templateDoc).stretchTo(templateDoc).play();
		}

		// BURNING HANDS.
		check = item.name.includes("Burning Hands");
		if (check) {
			const file = "jb2a.burning_hands.01.orange";
			return new Sequence().effect().file(file).atLocation(templateDoc).stretchTo(templateDoc).play();
		}

		// CALL LIGHTNING.
		check = item.name.includes("Call Lightning");
		if (check) {
			const file = "jb2a.lightning_strike.blue.0";
			return new Sequence().effect().file(file).atLocation(templateDoc).scale(2).play();
		}

		// DARKNESS.
		check = item.name.includes("Darkness");
		if (check) {
			const file = "jb2a.darkness.black";
			return new Sequence().effect().file(file).attachTo(templateDoc).tieToDocuments(templateDoc).persist().play();
		}

		// EVARD'S BLACK TENTACLES.
		check = item.name.includes("Black Tentacles");
		if (check) {
			const file = "jb2a.arms_of_hadar.dark_purple";
			return new Sequence().effect().file(file).attachTo(templateDoc).tieToDocuments(templateDoc).persist().play();
		}

		// GRAVITY WAVE.
		check = item.name.includes("Gravity Wave");
		if (check) {
			const file = "jb2a.sphere_of_annihilation.600px.purplered";
			return new Sequence().effect().file(file).attachTo(templateDoc).tieToDocuments(templateDoc).scale(2).fadeIn(500).persist().play();
		}

		// LIGHTNING BOLT.
		check = item.name.includes("Lightning Bolt");
		if (check) {
			const file = "jb2a.lightning_bolt.wide.blue";
			return new Sequence().effect().file(file).atLocation(templateDoc).stretchTo(templateDoc).play();
		}

		// STAR DUST.
		check = item.name.includes("Star Dust");
		if (check) {
			const file = "jb2a.side_impact.part.slow.star.pinkyellow";
			return new Sequence().effect().file(file).atLocation(templateDoc).stretchTo(templateDoc).play();
		}
	}

	static onItemRollAttack(item, roll, ammo) {
		const { name, actor } = item;
		if (!actor) return;

		const token = actor.token?.object ?? actor.getActiveTokens()[0];
		const target = game.user.targets.first();

		let check;

		// ELDRITCH BLAST.
		check = name.includes("Eldritch Blast");
		if (check) {
			if (!target || !token) return;
			const file = "jb2a.eldritch_blast";
			return new Sequence().effect().stretchTo(target).atLocation(token).file(file).play();
		}

		// FIRE BOLT.
		check = name.includes("Fire Bolt");
		if (check) {
			if (!target || !token) return;
			const file = "jb2a.fire_bolt.orange";
			return new Sequence().effect().stretchTo(target).atLocation(token).file(file).play();
		}

		// LIGHTING SPEAR.
		check = name.includes("Lightning Spear");
		if (check) {
			if (!target || !token) return;
			const file = "jb2a.bolt.lightning.blue";
			return new Sequence().effect().stretchTo(target).atLocation(token).file(file).playbackRate(2).play();
		}

		// RADIANT FLAME.
		check = name.includes("Radiant Flame");
		if (check) {
			if (!target || !token) return;
			const file = "jb2a.chain_lightning.secondary.yellow";
			return new Sequence().effect().stretchTo(target).atLocation(token).file(file).play();
		}

		// THUNDER PUNCH.
		check = name.includes("Thunder Punch");
		if (check) {
			if (!target || !token) return;
			const file = "jb2a.unarmed_strike.magical.01.blue";
			return new Sequence().effect().stretchTo(target).atLocation(token).file(file).play();
		}
	}

	static onItemRollDamage(item, roll) {
		const { name, actor } = item;
		if (!actor) return;

		const token = actor.token?.object ?? actor.getActiveTokens()[0];
		const target = game.user.targets.first();

		let check;

		// HEALING WORD.
		check = name.includes("Healing Word");
		if (check) {
			if (!target) return;
			const file = "jb2a.healing_generic.loop.tealyellow";
			return new Sequence().effect().attachTo(target).file(file).scaleIn(0, 500).play();
		}

		// CURE WOUNDS.
		check = name.includes("Cure Wounds");
		if (check) {
			if (!target) return;
			const file = "jb2a.cure_wounds.400px.blue";
			return new Sequence().effect().attachTo(target).file(file).scaleIn(0, 500).play();
		}

		// ELDRITCH SMITE.
		check = name.includes("Eldritch Smite");
		if (check) {
			if (!target) return;
			const file = "jb2a.divine_smite.target.purplepink";
			return new Sequence().effect().attachTo(target).file(file).play();
		}

		// DIVINE SMITE.
		check = name.includes("Divine Smite");
		if (check) {
			if (!target) return;
			const file = "jb2a.divine_smite.target.greenyellow";
			return new Sequence().effect().attachTo(target).file(file).play();
		}

		// LIGHTNING TENDRIL.
		check = name.includes("Lightning Tendril");
		if (check) {
			if (!target || !token) return;
			const file = "jb2a.chain_lightning.secondary.blue";
			return new Sequence().effect().stretchTo(target).atLocation(token).file(file).play();
		}
	}

	static onItemUse(item) {
		const { name, actor } = item;
		if (!actor) return;

		const token = actor.token?.object ?? actor.getActiveTokens()[0];
		const target = game.user.targets.first();

		let check;

		// ACID SPLASH.
		check = name.includes("Acid Splash");
		if (check) {
			if (!target) return;
			const file = "jb2a.liquid.splash.green";
			return new Sequence().effect().file(file).atLocation(target).play();
		}

		// CREATE OR DESTROY WATER.
		check = name.includes("Create or Destroy Water");
		if (check) {
			const file = "jb2a.liquid.splash.bright_blue";
			return new Sequence().effect().file(file).attachTo(token).play();
		}

		// DETECT MAGIC.
		check = name.includes("Detect Magic");
		if (check) {
			const file = "jb2a.detect_magic.circle";
			return new Sequence().effect().file(file).attachTo(token).play();
		}

		// DIVINE SENSE.
		check = name.includes("Divine Sense");
		if (check) {
			const file = "jb2a.token_border.circle.static.blue.001";
			return new Sequence().effect().file(file).fadeIn(500).duration(10000).fadeOut(500).attachTo(token).play();
		}

		// HUNTER'S MARK.
		check = name.includes("Hunter's Mark");
		if (check) {
			if (!target) return;
			const file = "jb2a.hunters_mark.pulse.01.green";
			return new Sequence().effect().file(file).atLocation(target).play();
		}

		// HEX.
		check = name.includes("Hex");
		if (check) {
			if (!target) return;
			const file = "jb2a.magic_signs.rune.enchantment.intro.purple";
			return new Sequence().effect().file(file).scale(0.5).atLocation(target).play();
		}

		// HEXBLADE'S CURSE.
		check = name.includes("Hexblade's Curse");
		if (check) {
			if (!target) return;
			const file = "jb2a.smoke.puff.centered.dark_black.0";
			return new Sequence().effect().file(file).scale(0.5).atLocation(target).play();
		}

		// UNSETTLING PRESENCE.
		check = name.includes("Unsettling Presence");
		if (check) {
			const file = "jb2a.icon.fear.dark_purple";
			return new Sequence().effect().file(file).fadeIn(500).duration(3000).fadeOut(500).attachTo(token).play();
		}

		// TOLL THE DEAD.
		check = name.includes("Toll the Dead");
		if (check) {
			if (!target) return;
			const file = "jb2a.toll_the_dead.purple.complete";
			return new Sequence().effect().file(file).scale(0.5).atLocation(target).play();
		}
	}

	static onRollSkill(actor, roll, skill) {
		const token = actor.token?.object ?? actor.getActiveTokens()[0];

		let check;

		// STEALTH.
		check = skill === "ste";
		if (check) {
			if (!token) return;
			const file = "jb2a.sneak_attack.";
			return new Sequence().effect().file(file).attachTo(token).play();
		}
	}
}
