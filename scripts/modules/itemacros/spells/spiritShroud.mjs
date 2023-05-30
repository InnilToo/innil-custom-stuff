import { DEPEND } from "../../../const.mjs";
import { ItemMacroHelpers } from "../../itemMacros.mjs";

export async function SPIRIT_SHROUD(
  item,
  speaker,
  actor,
  token,
  character,
  event,
  args
) {
  if (!ItemMacroHelpers._getDependencies(DEPEND.CN, DEPEND.VAE))
    return item.use();

  const use = await item.use(
    { createMeasuredTemplate: false },
    { configureDialog: false }
  );
  if (!use) return;

  const conc = await CN.waitForConcentrationStart(actor, { item });
  if (!conc) return;

  const buttons = [
    {
      icon: "snowflake",
      type: "cold",
      file: "jb2a.spirit_guardians.blue.ring",
    },
    {
      icon: "skull",
      type: "necrotic",
      file: "jb2a.spirit_guardians.dark_black.ring",
    },
    {
      icon: "holly-berry",
      type: "radiant",
      file: "jb2a.spirit_guardians.dark_whiteblue.ring",
    },
  ].reduce((acc, { icon, type, file }) => {
    acc[type] = {
      icon: `<i class="fa-solid fa-${icon}"></i>`,
      label: type.capitalize(),
      callback: (html, event) => flagEffect(html, event, file),
    };
    return acc;
  }, {});

  return new Dialog({
    title: item.name,
    content: "<p style='text-align:center'>Pick a damage type.</p>",
    buttons,
  }).render(true);

  async function flagEffect(html, event, file) {
    const type = event.currentTarget.dataset.button;
    const effect = CN.isActorConcentratingOnItem(actor, item);
    const level = effect.flags[DEPEND.CN].data.castData.castLevel;
    const value = `+${Math.ceil(level / 2) - 1}d8[${type}]`;
    const mode = CONST.ACTIVE_EFFECT_MODES.ADD;
    const changes = [
      { key: "system.bonuses.mwak.damage", mode, value },
      { key: "system.bonuses.msak.damage", mode, value },
    ];

    await new Sequence()
      .effect()
      .attachTo(token)
      .tieToDocuments(conc)
      .file(file)
      .scale(0.66667)
      .fadeIn(500)
      .persist()
      .play({ remote: true });

    return effect.update({ changes });
  }
}
