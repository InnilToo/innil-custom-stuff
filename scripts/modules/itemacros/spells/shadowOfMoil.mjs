import { DEPEND } from "../../../const.mjs";
import { ItemMacroHelpers } from "../../itemMacros.mjs";

export async function SHADOW_OF_MOIL(
  item,
  speaker,
  actor,
  token,
  character,
  event,
  args
) {
  if (
    !ItemMacroHelpers._getDependencies(
      DEPEND.CN,
      DEPEND.JB2A,
      DEPEND.SEQ,
      DEPEND.VAE
    )
  )
    return item.use();

  const use = await item.use();
  if (!use) return;

  const conc = await CN.waitForConcentrationStart(actor, { item });
  if (!conc) return;

  const effect = CN.isActorConcentratingOnItem(actor, item);
  const value = "radiant";
  const mode = CONST.ACTIVE_EFFECT_MODES.ADD;
  const changes = [{ key: "system.traits.dr.value", mode, value }];

  await effect.update({ changes });

  return new Sequence()
    .effect()
    .attachTo(token)
    .tieToDocuments(conc)
    .file("jb2a.extras.tmfx.inflow.circle.01")
    .tint("#1D1D1D")
    .fadeIn(500)
    .persist()
    .play({ remote: true });
}
