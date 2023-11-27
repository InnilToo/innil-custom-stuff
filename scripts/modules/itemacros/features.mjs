import { alchemist } from "./features/artificer-alchemist.mjs";
import { twilight } from "./features/cleric-twilight.mjs";
import { stars } from "./features/druid-stars.mjs";
import { misc } from "./features/misc.mjs";
import { hearth } from "./features/paladin-hearth.mjs";
import { paladin } from "./features/paladin.mjs";
import { races } from "./features/races.mjs";
import { sorcerer } from "./features/sorcerer.mjs";
import { fathomless } from "./features/warlock-fathomless.mjs";
import { wizard } from "./features/wizard.mjs";

export const features = {
  ...alchemist,
  ...twilight,
  ...stars,
  ...misc,
  ...hearth,
  ...paladin,
  ...races,
  ...sorcerer,
  ...fathomless,
  ...wizard,
};
