import { DEPEND } from "../scripts/const.mjs";

/*
1000: Bless
1100: Bane
1200: Haste
1300: Slow
1400: Fly
1500: Invisible
2000: Hex
2100: Hexblade's Curse
2200: Hunter's Mark
*/
export const SPELL_EFFECTS = [
  {
    id: "bane",
    label: "INNIL.StatusConditionBane",
    sort: 1100,
    icon: "assets/images/icons/conditions/bane.webp",
    duration: { seconds: 60 },
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You are under the effects of the Bane spell.</p>" +
            "<p>You subtract <strong>1d4</strong> from all saving throws and attack rolls.</p>",
        },
      },
    },
    changes: [
      { key: "system.bonuses.abilities.save", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "-1d4" },
      { key: "system.bonuses.msak.attack", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "-1d4" },
      { key: "system.bonuses.mwak.attack", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "-1d4" },
      { key: "system.bonuses.rsak.attack", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "-1d4" },
      { key: "system.bonuses.rwak.attack", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "-1d4" },
    ],
  },
  {
    id: "bless",
    label: "INNIL.StatusConditionBless",
    sort: 1000,
    icon: "assets/images/icons/conditions/bless.webp",
    duration: { seconds: 60 },
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You are under the effects of the Bless spell.</p>" +
            "<p>You add a <strong>1d4</strong> bonus to all saving throws and attack rolls.</p>",
        },
      },
    },
    changes: [
      { key: "system.bonuses.abilities.save", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "+1d4" },
      { key: "system.bonuses.msak.attack", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "+1d4" },
      { key: "system.bonuses.mwak.attack", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "+1d4" },
      { key: "system.bonuses.rsak.attack", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "+1d4" },
      { key: "system.bonuses.rwak.attack", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "+1d4" },
    ],
  },
  {
    id: "haste",
    label: "INNIL.StatusConditionHaste",
    sort: 1200,
    icon: "assets/images/icons/conditions/haste.webp",
    duration: { seconds: 60 },
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You are under the effects of the Haste spell.</p>" +
            "<p>Your movement speed is doubled, you have a +2 bonus to AC, and you have advantage on Dexterity saving throws.</p>",
        },
      },
    },
    changes: [
      { key: "system.attributes.ac.bonus", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: 2 },
      { key: "system.attributes.movement.walk", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 2 },
      { key: "system.attributes.movement.fly", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 2 },
      { key: "system.attributes.movement.swim", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 2 },
      { key: "system.attributes.movement.climb", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 2 },
      { key: "system.attributes.movement.burrow", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 2 },
    ],
  },
  {
    id: "slow",
    label: "INNIL.StatusConditionSlow",
    sort: 1300,
    icon: "assets/images/icons/conditions/slowed.webp",
    duration: { seconds: 60 },
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You are under the effects of the Slow spell.</p>" +
            "<p>Your movement speed is halved, and you subtract 2 from your AC and Dexterity saving throws.</p>",
        },
      },
    },
    changes: [
      { key: "system.attributes.ac.bonus", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: -2 },
      { key: "system.abilities.dex.bonuses.save", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: -2 },
      { key: "system.attributes.movement.walk", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0.5 },
      { key: "system.attributes.movement.fly", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0.5 },
      { key: "system.attributes.movement.swim", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0.5 },
      { key: "system.attributes.movement.climb", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0.5 },
      { key: "system.attributes.movement.burrow", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0.5 },
    ],
  },
  {
    id: "invisible",
    label: "INNIL.StatusConditionInvisible",
    sort: 1500,
    icon: "assets/images/icons/conditions/invisible.webp",
    duration: { seconds: 3600 },
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You are invisible.</p>" +
            "<p>You are impossible to see, and are considered heavily obscured.</p>" +
            "<p>Attack rolls against you have disadvantage, and your attack rolls have advantage.</p>",
        },
      },
    },
  },
  {
    id: "fly",
    label: "INNIL.StatusConditionFlying",
    sort: 1400,
    icon: "assets/images/icons/conditions/flying.webp",
    duration: { seconds: 600 },
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro: "<p>You are under the effects of the Fly spell.</p>" + "<p>You have a flying speed of 60 feet.</p>",
        },
      },
    },
    changes: [{ key: "system.attributes.movement.fly", mode: CONST.ACTIVE_EFFECT_MODES.UPGRADE, value: 60 }],
  },
  {
    id: "hex",
    label: "Hexxed",
    sort: 2000,
    icon: "icons/magic/unholy/hand-marked-pink.webp",
    duration: { seconds: 3600 },
    flags: {
      convenientDescription: `
            <p>You take extra 1d6 necrotic damage when the caster hits you with an attack.</p>
            <p>You also have disadvantage on ability checks made with the casters chosen ability.</p>`,
    },
  },
  {
    id: "hexcurse",
    label: "Hexblade's Curse",
    sort: 2100,
    icon: "icons/magic/unholy/hand-light-pink.webp",
    duration: { seconds: 60 },
    flags: {
      convenientDescription: `
            <p>You take extra damage equal to the caster's proficiency bonus.</p>
            <p>Any attacks from the caster are critical hit on a roll of 19 or 20 on the d20.</p>
            <p>If you die the caster regains hit points equal to their warlock level + their Charisma modifier (minimum of 1 hit point).</p>`,
    },
  },
  {
    id: "hmark",
    label: "Hunter's Mark",
    sort: 2200,
    icon: "icons/skills/targeting/crosshair-pointed-orange.webp",
    duration: { seconds: 3600 },
    flags: {
      convenientDescription: `
            <p>You take extra 1d6 damage when the caster hits you with an attack.</p>
            <p>The casters has advantage on any Wisdom (Perception) or Wisdom (Survival) check to find you.</p>`,
    },
  },
];

/*
100: Dead
200: Charmed, Frightened (250), Poisoned (280)
300: Blinded, Deafened (330), Muted (360)
400: Prone, Grappled (430), Restrained (450)
500: Incapacitated, Stunned (540), Unconscious (560)
600: Paralyzed, Petrified (650)
700: Invisible, Flying (750)
1600: Reaction
*/
export const STATUS_EFFECTS = [
  {
    id: "blind",
    label: "INNIL.StatusConditionBlinded",
    sort: 300,
    icon: "assets/images/icons/conditions/blinded.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You cannot see, and you automatically fail any ability checks that require sight.</p>" +
            "<p>Attack rolls against you have advantage, and your attack rolls have disadvantage.</p>",
        },
      },
    },
  },
  {
    id: "charm",
    label: "INNIL.StatusConditionCharmed",
    sort: 200,
    icon: "assets/images/icons/conditions/charmed.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You cannot attack the charmer or target them with harmful abilities or magical effects.</p>" +
            "<p>The charmer has advantage on any ability check to interact socially with you.</p>",
        },
      },
    },
  },
  {
    id: "dead",
    label: "INNIL.StatusConditionDead",
    sort: 100,
    icon: "assets/images/icons/conditions/dead.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro: "<p>You have met an unfortunate end.</p>",
        },
      },
    },
  },
  {
    id: "deaf",
    label: "INNIL.StatusConditionDeafened",
    sort: 330,
    icon: "assets/images/icons/conditions/deafened.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro: "<p>You cannot hear and automatically fail any ability checks that require hearing.</p>",
        },
      },
    },
  },
  {
    id: "mute",
    label: "INNIL.StatusConditionMuted",
    sort: 360,
    icon: "assets/images/icons/conditions/muted.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You cannot speak and cannot cast spells with a verbal component.</p>" +
            "<p>You automatically fail any ability checks that require speech.</p>",
        },
      },
    },
  },
  {
    id: "fear",
    label: "INNIL.StatusConditionFrightened",
    sort: 250,
    icon: "assets/images/icons/conditions/frightened.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You have disadvantage on all attack rolls and ability checks while the source of your fear is within your line of sight.</p>" +
            "<p>You cannot willingly move closer to the source of your fear.</p>",
        },
      },
    },
  },
  {
    id: "grappled",
    label: "INNIL.StatusConditionGrappled",
    sort: 430,
    icon: "assets/images/icons/conditions/grappled.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro: "<p>Your speed is zero.</p>",
        },
      },
    },
    changes: [
      { key: "system.attributes.movement.walk", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.fly", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.swim", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.climb", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.burrow", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
    ],
  },
  {
    id: "incapacitated",
    label: "INNIL.StatusConditionIncapacitated",
    sort: 500,
    icon: "assets/images/icons/conditions/incapacitated.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro: "<p>You cannot take actions or reactions.</p>",
        },
      },
    },
  },
  {
    id: "paralysis",
    label: "INNIL.StatusConditionParalyzed",
    sort: 600,
    icon: "assets/images/icons/conditions/paralyzed.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You are incapacitated, and you cannot move or speak.</p>" +
            "<p>You automatically fail Strength and Dexterity saving throws.</p>" +
            "<p>Attack rolls against you have advantage, and any attacks against you is a critical hit if the attacker is within 5 feet of you.</p>",
        },
      },
    },
    changes: [
      { key: "system.attributes.movement.walk", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.fly", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.swim", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.climb", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.burrow", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
    ],
  },
  {
    id: "petrified",
    label: "INNIL.StatusConditionPetrified",
    sort: 650,
    icon: "assets/images/icons/conditions/petrified.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You are inanimate, incapacitated, and unaware of your surroundings.</p>" +
            "<p>Your weight is increased by a factor of ten, you cannot move or speak, and attack rolls against you have advantage.</p>" +
            "<p>You automatically fail all Strength and Dexterity saving throws.</p>" +
            "<p>You have resistance to all damage, and you are immune to poison and disease.</p>",
        },
      },
    },
  },
  {
    id: "poison",
    label: "INNIL.StatusConditionPoisoned",
    sort: 280,
    icon: "assets/images/icons/conditions/poisoned.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro: "<p>You have disadvantage on all attack rolls and ability checks.</p>",
        },
      },
    },
  },
  {
    id: "prone",
    label: "INNIL.StatusConditionProne",
    sort: 400,
    icon: "assets/images/icons/conditions/prone.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You can only crawl unless you expend half your movement to stand up.</p>" +
            "<p>You have disadvantage on attack rolls, and any attack roll has advantage against you if the attacker is within 5 feet of you; it otherwise has disadvantage.</p>",
        },
      },
    },
  },
  {
    id: "restrain",
    label: "INNIL.StatusConditionRestrained",
    sort: 450,
    icon: "assets/images/icons/conditions/restrained.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>Your speed is zero, attack rolls against you have advantage, and your attack rolls have disadvantage.</p>" +
            "<p>You have disadvantage on Dexterity saving throws.</p>",
        },
      },
    },
    changes: [
      { key: "system.attributes.movement.walk", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.fly", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.swim", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.climb", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.burrow", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
    ],
  },
  {
    id: "stun",
    label: "INNIL.StatusConditionStunned",
    sort: 540,
    icon: "assets/images/icons/conditions/stunned.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You are incapacitated, cannot move, and can speak only falteringly.</p>" +
            "<p>You automatically fail Strength and Dexterity saving throws, and attack rolls against you have advantage.</p>",
        },
      },
    },
    changes: [
      { key: "system.attributes.movement.walk", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.fly", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.swim", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.climb", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.burrow", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
    ],
  },
  {
    id: "unconscious",
    label: "INNIL.StatusConditionUnconscious",
    sort: 560,
    icon: "assets/images/icons/conditions/unconscious.webp",
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You are incapacitated, cannot move or speak, you fall prone, and you automatically fail all Strength and Dexterity saving throws.</p>" +
            "<p>Attack rolls against you have advantage, and any attack that hits you is a critical hit if the attacker is within 5 feet of you.</p>",
        },
      },
    },
    changes: [
      { key: "system.attributes.movement.walk", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.fly", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.swim", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.climb", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
      { key: "system.attributes.movement.burrow", mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY, value: 0, priority: 60 },
    ],
  },
  {
    id: "reaction",
    label: "INNIL.StatusConditionReaction",
    sort: 1600,
    icon: "assets/images/icons/conditions/reaction.webp",
    duration: { rounds: 1 },
    flags: {
      [DEPEND.VAE]: {
        data: {
          intro:
            "<p>You have spent your reaction. You cannot take another reaction until the start of your next turn.</p>",
        },
      },
      effectmacro: {
        onCombatEnd: {
          script: `(${function () {
            return effect.delete();
          }})()`,
        },
        onCombatStart: {
          script: `(${function () {
            return effect.delete();
          }})()`,
        },
        onTurnStart: {
          script: `(${function () {
            return effect.delete();
          }})()`,
        },
      },
    },
  },
];
