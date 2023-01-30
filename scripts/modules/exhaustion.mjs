import { MODULE_NAME } from "../const.mjs";
import { INNIL_UTILS } from "./innil_functions.mjs";

export function innil_exhaustion() {
  Hooks.on("renderActorSheet", (sheet, html) => {
    const exh = html[0].querySelector(".counter.flexrow.exhaustion");
    if (!exh) return;
    // disable input.
    exh.querySelector(".counter-value input").disabled = true;
    // add class and action to h4.
    const header = exh.querySelector("h4");
    header.classList.add("rollable");
    header.setAttribute("data-action", "updateExhaustion");
    // create listeners (black magic).
    if (sheet.innil?.exhaustion === undefined) {
      foundry.utils.setProperty(sheet, "innil.exhaustion", exhaustionUpdate.bind(sheet.object));
      sheet.element[0].addEventListener("click", sheet.innil.exhaustion);
    } else {
      sheet.element[0].removeEventListener("click", sheet.innil.exhaustion);
      sheet.element[0].addEventListener("click", sheet.innil.exhaustion);
    }
  });
}

function exhaustionUpdate(event) {
  const action = event.target.closest("[data-action=updateExhaustion]");
  if (!action) return;

  const actor = this;

  // dialog that asks to up or down exhaustion.
  // call increase_ or decrease_exhaustion
  class ExhaustDialog extends Dialog {
    constructor(obj, options) {
      super(obj, options);
      this.object = obj.object;
    }
    get id() {
      return `${MODULE_NAME}-exhaust-dialog-${this.object.id}`;
    }
  }
  new ExhaustDialog({
    object: actor,
    title: `Exhaustion: ${actor.name}`,
    content: "<p>Increase or decrease your level of exhaustion.</p>",
    buttons: {
      up: {
        icon: "<i class='fas fa-arrow-up'></i>",
        label: "Gain a Level",
        callback: () => INNIL_UTILS.increase_exhaustion(actor),
      },
      down: {
        icon: "<i class='fas fa-arrow-down'></i>",
        label: "Down a Level",
        callback: () => INNIL_UTILS.decrease_exhaustion(actor),
      },
    },
  }).render(true);
}
