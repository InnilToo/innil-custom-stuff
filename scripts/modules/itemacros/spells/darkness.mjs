import { DEPEND } from "../../../const.mjs";
import { ItemMacroHelpers } from "../../itemMacros.mjs";

export async function DARKNESS(
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
      DEPEND.WG,
      DEPEND.SEQ,
      DEPEND.JB2A
    )
  )
    return item.use();

  const isConc = CN.isActorConcentratingOnItem(actor, item);
  if (!isConc) {
    const use = await item.use(
      { createMeasuredTemplate: false },
      { configureDialog: false }
    );
    if (!use) return;
    const conc = await CN.waitForConcentrationStart(actor, { item });
    if (!conc) return;

    const file = "jb2a.darkness.black";

    const dialog = new Dialog({
      title: "Darkness",
      content:
        "<p style='text-align:center'>Either put the Darkness on yourself or spawn a token that carries it:</p>",
      buttons: {
        Self: {
          icon: "<i class='fa-solid fa-user'></i>",
          label: "Self",
          callback: async () => {
            // Play a sequence on token
            await new Sequence()
              .effect()
              .attachTo(token)
              .tieToDocuments(conc)
              .file(file)
              .persist()
              .play({ remote: true });
          },
        },
        Spawn: {
          icon: "<i class='fa-regular fa-circle-dot'></i>",
          label: "Spawn",
          callback: async () => {
            // Define the update and options objects for ItemMacroHelpers._spawnHelper
            const updates = {
              token: { name: `${actor.name.split(" ")[0]}'s Darkness` },
            };
            const options = { crosshairs: { interval: -1 } };
            // Draw the circle around the token
            const p = ItemMacroHelpers.drawCircle(
              token,
              item.system.range.value
            );
            await actor.sheet.minimize();
            // Spawn the token
            const [spawn] = await ItemMacroHelpers._spawnHelper(
              "dummy",
              updates,
              {},
              options
            );
            await actor.sheet.maximize();
            canvas.app.stage.removeChild(p);

            // Play a sequence on the spawn
            await new Sequence()
              .effect()
              .attachTo(spawn)
              .tieToDocuments(conc)
              .file(file)
              .persist()
              .play({ remote: true });

            // Add the token dismissal to the effect
            const effect = CN.isActorConcentratingOnItem(actor, item);
            if (!spawn) return effect.delete();
            return ItemMacroHelpers._addTokenDismissalToEffect(effect, spawn);
          },
        },
      },
    });

    return dialog.render(true);
  } else {
    return ui.notifications.warn("You are already concentrating on Darkness.");
  }
}
