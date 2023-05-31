import { DEPEND } from "../../../const.mjs";
import { ItemMacroHelpers } from "../../itemMacros.mjs";

export async function PASS_WITHOUT_TRACE(
  item,
  speaker,
  actor,
  token,
  character,
  event,
  args
) {
  if (!ItemMacroHelpers._getDependencies(DEPEND.CN, DEPEND.JB2A, DEPEND.SEQ))
    return item.use();

  const use = await item.use();
  if (!use) return;

  const effect = await CN.waitForConcentrationStart(actor, { item });
  if (!effect) return;

  await new Sequence()
    .effect()
    .attachTo(token)
    .tieToDocuments(effect)
    .file("jb2a.butterflies.few")
    .fadeIn(500)
    .persist()
    .play({ remote: true });

  const babData = babonus
    .createBabonus({
      name: `Pass Without Trace`,
      type: "test",
      description:
        "<p>Each creature you choose within 30 feet of you (including you) has a +10 bonus to Dexterity (Stealth) checks.</p>",
      bonuses: { bonus: 10 },
      aura: { disposition: 1, enabled: true, range: "30", self: true },
      filters: {
        abilities: ["dex"],
        skillIds: ["ste"],
      },
    })
    .toObject();

  return effect.setFlag("babonus", `bonuses.${babData.id}`, babData);
}
