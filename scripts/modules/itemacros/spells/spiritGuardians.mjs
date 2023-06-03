import { DEPEND } from "../../../const.mjs";
import { ItemMacroHelpers } from "../../itemMacros.mjs";

export async function SPIRIT_GUARDIANS(
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

  const conc = await CN.waitForConcentrationStart(actor, { item });
  if (!conc) return;

  return new Sequence()
    .effect()
    .attachTo(token)
    .tieToDocuments(conc)
    .file("jb2a.spirit_guardians.blueyellow")
    .fadeIn(500)
    .persist()
    .play({ remote: true });
}
