// Exhaustion status effect
export const EXHAUSTION_EFFECTS = [
  {
    id: "exhaustion",
    label: "Exhaustion (1)",
    icon: "icons/skills/wounds/injury-body-pain-gray.webp",
    flags: {
      "innil-custom-stuff": { exhaustion: 1 },
      convenientDescription: `
<p>You have disadvantage on all ability checks.</p>`,
    },
    changes: [
      {
        key: "system.attributes.exhaustion",
        mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
        value: 1,
      },
    ],
  },
  {
    id: "exhaustion",
    label: "Exhaustion (2)",
    icon: "icons/skills/wounds/injury-body-pain-gray.webp",
    flags: {
      "innil-custom-stuff": { exhaustion: 2 },
      convenientDescription: `
<p>You have disadvantage on all ability checks.</p>
<p>Your movement speed is halved.</p>`,
    },
    changes: [
      {
        key: "system.attributes.exhaustion",
        mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
        value: 2,
      },
      {
        key: "system.attributes.movement.walk",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
      {
        key: "system.attributes.movement.fly",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
      {
        key: "system.attributes.movement.swim",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
      {
        key: "system.attributes.movement.climb",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
    ],
  },
  {
    id: "exhaustion",
    label: "Exhaustion (3)",
    icon: "icons/skills/wounds/injury-body-pain-gray.webp",
    flags: {
      "innil-custom-stuff": { exhaustion: 3 },
      convenientDescription: `
<p>You have disadvantage on all ability checks, attack rolls, and saving throws.</p>
<p>Your movement speed is halved.</p>`,
    },
    changes: [
      {
        key: "system.attributes.exhaustion",
        mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
        value: 3,
      },
      {
        key: "system.attributes.movement.walk",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
      {
        key: "system.attributes.movement.fly",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
      {
        key: "system.attributes.movement.swim",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
      {
        key: "system.attributes.movement.climb",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
    ],
  },
  {
    id: "exhaustion",
    label: "Exhaustion (4)",
    icon: "icons/skills/wounds/injury-body-pain-gray.webp",
    flags: {
      "innil-custom-stuff": { exhaustion: 4 },
      convenientDescription: `
<p>You have disadvantage on all ability checks, attack rolls, and saving throws.</p>
<p>Your movement speed and your maximum hit points are halved.</p>`,
    },
    changes: [
      {
        key: "system.attributes.exhaustion",
        mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
        value: 4,
      },
      {
        key: "system.attributes.movement.walk",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
      {
        key: "system.attributes.movement.fly",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
      {
        key: "system.attributes.movement.swim",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
      {
        key: "system.attributes.movement.climb",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
      {
        key: "system.attributes.hp.max",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
    ],
  },
  {
    id: "exhaustion",
    label: "Exhaustion (5)",
    icon: "icons/skills/wounds/injury-body-pain-gray.webp",
    flags: {
      "innil-custom-stuff": { exhaustion: 5 },
      convenientDescription: `
<p>You have disadvantage on all ability checks, attack rolls, and saving throws.</p>
<p>You cannot move, and your hit point maximum is halved.</p>`,
    },
    changes: [
      {
        key: "system.attributes.exhaustion",
        mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
        value: 5,
      },
      {
        key: "system.attributes.movement.walk",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0",
      },
      {
        key: "system.attributes.movement.fly",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0",
      },
      {
        key: "system.attributes.movement.swim",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0",
      },
      {
        key: "system.attributes.movement.climb",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0",
      },
      {
        key: "system.attributes.hp.max",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        value: "0.5",
      },
    ],
  },
];
