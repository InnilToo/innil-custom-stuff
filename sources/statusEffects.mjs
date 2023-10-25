export const STATUS_EFFECTS = [
  {
    id: "blind",
    name: "INNIL.StatusConditionBlind",
    icon: "assets/images/icons/conditions/blinded.webp",
    description:
      "<p>You cannot see, and you automatically fail any ability checks that require sight.</p>" +
      "<p>Attack rolls against you have advantage, and your attack rolls have disadvantage.</p>",
  },
  {
    id: "charm",
    name: "INNIL.StatusConditionCharm",
    icon: "assets/images/icons/conditions/charmed.webp",
    description:
      "<p>You cannot attack the charmer or target them with harmful abilities or magical effects.</p>" +
      "<p>The charmer has advantage on any ability check to interact socially with you.</p>",
  },
  {
    id: "dead",
    name: "INNIL.StatusConditionDead",
    icon: "assets/images/icons/conditions/dead.webp",
    description: "<p>You have met an unfortunate end.</p>",
  },
  {
    id: "deaf",
    name: "INNIL.StatusConditionDeaf",
    icon: "assets/images/icons/conditions/deafened.webp",
    description: "<p>You cannot hear and automatically fail any ability checks that require hearing.</p>",
  },
  {
    id: "mute",
    name: "INNIL.StatusConditionMute",
    icon: "assets/images/icons/conditions/muted.webp",
    description:
      "<p>You cannot speak and cannot cast spells with a verbal component.</p>" +
      "<p>You automatically fail any ability checks that require speech.</p>",
  },
  {
    id: "fear",
    name: "INNIL.StatusConditionFear",
    icon: "assets/images/icons/conditions/frightened.webp",
    description:
      "<p>You have disadvantage on all attack rolls and ability checks while the source of your fear is within your line of sight.</p>" +
      "<p>You cannot willingly move closer to the source of your fear.</p>",
  },
  {
    id: "grappled",
    name: "INNIL.StatusConditionGrappled",
    icon: "assets/images/icons/conditions/grappled.webp",
    description: "<p>Your speed is zero.</p>",
    changes: [
      {
        key: "system.attributes.movement.walk",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.fly",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.swim",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.climb",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.burrow",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
    ],
  },
  {
    id: "incapacitated",
    name: "INNIL.StatusConditionIncapacitated",
    icon: "assets/images/icons/conditions/incapacitated.webp",
    description: "<p>You cannot take actions or reactions. You lose concentration and cannot concentrate on spells.</p>",
  },
  {
    id: "paralysis",
    name: "INNIL.StatusConditionParalysis",
    icon: "assets/images/icons/conditions/paralyzed.webp",
    description:
      "<p>You are incapacitated, and you cannot move or speak.</p>" +
      "<p>You automatically fail Strength and Dexterity saving throws.</p>" +
      "<p>Attack rolls against you have advantage, and any attacks against you is a critical hit if the attacker is within 5 feet of you.</p>",
    changes: [
      {
        key: "system.attributes.movement.walk",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.fly",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.swim",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.climb",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.burrow",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
    ],
  },
  {
    id: "petrified",
    name: "INNIL.StatusConditionPetrified",
    icon: "assets/images/icons/conditions/petrified.webp",
    description:
      "<p>You are inanimate, incapacitated, and unaware of your surroundings.</p>" +
      "<p>Your weight is increased by a factor of ten, you cannot move or speak, and attack rolls against you have advantage.</p>" +
      "<p>You automatically fail all Strength and Dexterity saving throws.</p>" +
      "<p>You have resistance to all damage, and you are immune to poison and disease.</p>",
  },
  {
    id: "poison",
    name: "INNIL.StatusConditionPoison",
    icon: "assets/images/icons/conditions/poisoned.webp",
    description: "<p>You have disadvantage on all attack rolls and ability checks.</p>",
  },
  {
    id: "prone",
    name: "INNIL.StatusConditionProne",
    icon: "assets/images/icons/conditions/prone.webp",
    description:
      "<p>You can only crawl unless you expend half your movement to stand up.</p>" +
      "<p>You have disadvantage on attack rolls, and any attack roll has advantage against you if the attacker is within 5 feet of you; it otherwise has disadvantage.</p>",
  },
  {
    id: "restrain",
    name: "INNIL.StatusConditionRestrain",
    icon: "assets/images/icons/conditions/restrained.webp",
    description:
      "<p>Your speed is zero, attack rolls against you have advantage, and your attack rolls have disadvantage.</p>" +
      "<p>You have disadvantage on Dexterity saving throws.</p>",
    changes: [
      {
        key: "system.attributes.movement.walk",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.fly",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.swim",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.climb",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.burrow",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
    ],
  },
  {
    id: "stun",
    name: "INNIL.StatusConditionStun",
    icon: "assets/images/icons/conditions/stunned.webp",
    description:
      "<p>You are incapacitated, cannot move, and can speak only falteringly.</p>" +
      "<p>You automatically fail Strength and Dexterity saving throws, and attack rolls against you have advantage.</p>",
    changes: [
      {
        key: "system.attributes.movement.walk",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.fly",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.swim",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.climb",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.burrow",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
    ],
  },
  {
    id: "unconscious",
    name: "INNIL.StatusConditionUnconscious",
    icon: "assets/images/icons/conditions/unconscious.webp",
    description:
      "<p>You are incapacitated, cannot move or speak, you fall prone, and you automatically fail all Strength and Dexterity saving throws.</p>" +
      "<p>Attack rolls against you have advantage, and any attack that hits you is a critical hit if the attacker is within 5 feet of you.</p>",
    changes: [
      {
        key: "system.attributes.movement.walk",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.fly",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.swim",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.climb",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
      {
        key: "system.attributes.movement.burrow",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0,
        priority: 60,
      },
    ],
  },
  {
    id: "reaction",
    name: "INNIL.StatusConditionReaction",
    icon: "assets/images/icons/conditions/reaction.webp",
    duration: { rounds: 1 },
    description: "<p>You have spent your reaction. You cannot take another reaction until the start of your next turn.</p>",
    flags: {
      effectmacro: {
        onCombatEnd: { script: "return effect.delete();" },
        onCombatStart: { script: "return effect.delete();" },
        onTurnStart: { script: "return effect.delete();" },
      },
    },
  },
  {
    id: "bless",
    name: "INNIL.StatusConditionBless",
    icon: "assets/images/icons/conditions/bless.webp",
    duration: { seconds: 60 },
    description:
      "<p>You are under the effects of the Bless spell.</p>" +
      "<p>You add a <strong>1d4</strong> bonus to all saving throws and attack rolls.</p>",
    changes: [
      {
        key: "system.bonuses.abilities.save",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: "+1d4",
      },
      {
        key: "system.bonuses.msak.attack",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: "+1d4",
      },
      {
        key: "system.bonuses.mwak.attack",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: "+1d4",
      },
      {
        key: "system.bonuses.rsak.attack",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: "+1d4",
      },
      {
        key: "system.bonuses.rwak.attack",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: "+1d4",
      },
    ],
  },
  {
    id: "bane",
    name: "INNIL.StatusConditionBane",
    icon: "assets/images/icons/conditions/bane.webp",
    duration: { seconds: 60 },
    description:
      "<p>You are under the effects of the Bane spell.</p>" +
      "<p>You subtract <strong>1d4</strong> from all saving throws and attack rolls.</p>",
    changes: [
      {
        key: "system.bonuses.abilities.save",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: "-1d4",
      },
      {
        key: "system.bonuses.msak.attack",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: "-1d4",
      },
      {
        key: "system.bonuses.mwak.attack",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: "-1d4",
      },
      {
        key: "system.bonuses.rsak.attack",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: "-1d4",
      },
      {
        key: "system.bonuses.rwak.attack",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: "-1d4",
      },
    ],
  },
  {
    id: "haste",
    name: "INNIL.StatusConditionHaste",
    icon: "assets/images/icons/conditions/haste.webp",
    duration: { seconds: 60 },
    description:
      "<p>You are under the effects of the Haste spell.</p>" +
      "<p>Your movement speed is doubled, you have a +2 bonus to AC, and you have advantage on Dexterity saving throws.</p>",
    changes: [
      {
        key: "system.attributes.ac.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: 2,
      },
      {
        key: "system.attributes.movement.walk",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 2,
      },
      {
        key: "system.attributes.movement.fly",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 2,
      },
      {
        key: "system.attributes.movement.swim",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 2,
      },
      {
        key: "system.attributes.movement.climb",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 2,
      },
      {
        key: "system.attributes.movement.burrow",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 2,
      },
    ],
  },
  {
    id: "slow",
    name: "INNIL.StatusConditionSlow",
    icon: "assets/images/icons/conditions/slowed.webp",
    duration: { seconds: 60 },
    description:
      "<p>You are under the effects of the Slow spell.</p>" +
      "<p>Your movement speed is halved, and you subtract 2 from your AC and Dexterity saving throws.</p>",
    changes: [
      {
        key: "system.attributes.ac.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: -2,
      },
      {
        key: "system.abilities.dex.bonuses.save",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: -2,
      },
      {
        key: "system.attributes.movement.walk",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0.5,
      },
      {
        key: "system.attributes.movement.fly",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0.5,
      },
      {
        key: "system.attributes.movement.swim",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0.5,
      },
      {
        key: "system.attributes.movement.climb",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0.5,
      },
      {
        key: "system.attributes.movement.burrow",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: 0.5,
      },
    ],
  },
  {
    id: "fly",
    name: "INNIL.StatusConditionFly",
    icon: "assets/images/icons/conditions/flying.webp",
    duration: { seconds: 600 },
    description: "<p>You are under the effects of the Fly spell.</p>" + "<p>You have a flying speed of 60 feet.</p>",
    changes: [
      {
        key: "system.attributes.movement.fly",
        mode: CONST.ACTIVE_EFFECT_MODES.UPGRADE,
        value: 60,
      },
    ],
  },
  {
    id: "invisible",
    name: "INNIL.StatusConditionInvisible",
    icon: "assets/images/icons/conditions/invisible.webp",
    duration: { seconds: 3600 },
    description:
      "<p>You are invisible.</p>" +
      "<p>You are impossible to see, and are considered heavily obscured.</p>" +
      "<p>Attack rolls against you have disadvantage, and your attack rolls have advantage.</p>",
  },
  {
    id: "hex",
    name: "INNIL.StatusConditionHex",
    icon: "icons/magic/unholy/hand-marked-pink.webp",
    duration: { seconds: 3600 },
    description:
      "<p>You take extra 1d6 necrotic damage when the caster hits you with an attack.</p>" +
      "<p>You also have disadvantage on ability checks made with the casters chosen ability.</p>",
  },
  {
    id: "hexcurse",
    name: "INNIL.StatusConditionHexcurse",
    icon: "icons/magic/unholy/hand-light-pink.webp",
    duration: { seconds: 60 },
    description:
      "<p>You take extra damage equal to the caster's proficiency bonus.</p>" +
      "<p>Any attacks from the caster are critical hit on a roll of 19 or 20 on the d20.</p>" +
      "<p>If you die the caster regains hit points equal to their warlock level + their Charisma modifier (minimum of 1 hit point).</p>",
  },
  {
    id: "huntersmark",
    name: "INNIL.StatusConditionHuntersMark",
    icon: "icons/skills/targeting/crosshair-pointed-orange.webp",
    duration: { seconds: 3600 },
    description:
      "<p>You take extra 1d6 damage when the caster hits you with an attack.</p>" +
      "<p>The casters has advantage on any Wisdom (Perception) or Wisdom (Survival) check to find you.</p>",
  },
];

/**
 * Assigns sort order to each status effect based on its ID.
 * It adds a 'sort' property to each status effect object in the provided array.
 * @param {Array} statusEffects     The array of status effect objects.
 * @private
 */
const assignSortOrder = (statusEffects) => {
  const sortedEffectIds = statusEffects.map((effect) => effect.id).sort();

  const sortOrderMapping = sortedEffectIds.reduce((mapping, id, index) => {
    mapping[id] = (index + 1) * 10;
    return mapping;
  }, {});

  statusEffects.forEach((effect) => {
    effect.sort = sortOrderMapping[effect.id];
  });
};

assignSortOrder(STATUS_EFFECTS);
