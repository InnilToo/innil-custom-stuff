import { ItemMacroHelpers } from "../../itemMacros.mjs";

export const paladin = { DIVINE_SMITE, LAY_ON_HANDS };

async function DIVINE_SMITE(item, speaker, actor, token, character, event, args) {
  const options = ItemMacroHelpers._constructSpellSlotOptions(actor);
  if (!options.length) {
    ui.notifications.warn("You have no spell slots remaining.");
    return;
  }

  const type = game.user.targets.first()?.actor?.system.details.type?.value;
  const isEvil = ["fiend", "undead"].includes(type);
  const content = `
  <form class="dnd5e">
    <div class="form-group">
      <label>Spell Slot</label>
      <div class="form-fields">
        <select name="level" autofocus>${options}</select>
      </div>
    </div>
    <div class="form-group">
      <label>Extra Die</label>
      <div class="form-fields">
        <input type="checkbox" name="evil" ${isEvil ? "checked" : ""}>
      </div>
    </div>
  </form>`;

  return new Dialog({
    title: item.name,
    content,
    buttons: {
      smite: {
        label: "Smite!",
        icon: "<i class='fa-solid fa-gavel'></i>",
        callback: rollDamage,
      },
    },
  }).render(true);

  async function rollDamage(html, event) {
    const data = new FormDataExtended(html[0].querySelector("form")).object;
    const level = data.level === "pact" ? actor.system.spells.pact.level : Number(data.level.at(-1));
    const formula = `${Math.min(5, 1 + level) + Number(data.evil)}d8`;

    const clone = new Item.implementation(
      {
        type: "feat",
        name: item.name,
        system: {
          actionType: "other",
          damage: { parts: [[formula, "radiant"]] },
        },
      },
      { parent: actor }
    );
    clone.prepareData();
    clone.prepareFinalAttributes();

    const roll = await clone.rollDamage({ event });
    if (!roll) return;
    const value = actor.system.spells[data.level].value - 1;
    return actor.update({ [`system.spells.${data.level}.value`]: value });
  }
}

async function LAY_ON_HANDS(item, speaker, actor, token, character, event, args) {
  const value = item.system.uses.value;
  if (!value) {
    ui.notifications.warn(game.i18n.format("DND5E.ItemNoUses", { name: item.name }));
    return;
  }

  const range = HandlebarsHelpers.rangePicker({
    hash: {
      min: 1,
      max: value,
      value: 1,
      step: 1,
      name: item.name.slugify({ strict: true }),
    },
  });

  const content = `
  <form class="dnd5e">
    <div class="form-group">
      <label>Hit points to restore</label>
      <div class="form-fields">${range}</div>
    </div>
  </form>`;

  const buttons = {
    heal: {
      icon: "<i class='fa-solid fa-hand-holding-heart'></i>",
      label: "Heal! (<span data-attr='lay'>1+</span>)",
      callback: heal,
    },
    cure: {
      icon: "<i class='fa-solid fa-virus'></i>",
      label: "Cure! (5)",
      callback: cure,
    },
  };
  if (value < 5) delete buttons.cure;

  return new Dialog({
    title: item.name,
    content,
    buttons,
    render: (html) => {
      const range = html[0].querySelector("input");
      const target = html[0].querySelector(".range-value");
      const button = range.closest(".window-content").querySelector("[data-attr='lay']");
      range.addEventListener("change", function (event) {
        target.innerText = event.currentTarget.value;
        button.innerText = event.currentTarget.value;
      });
    },
  }).render(true);

  async function heal(html) {
    const number = Number(html[0].querySelector("input").value);
    await new Roll(`${number}`).toMessage({ speaker, flavor: item.name });
    return item.update({ "system.uses.value": value - number });
  }

  async function cure() {
    await ChatMessage.create({
      speaker,
      content: `${actor.name} cures a disease or poison.`,
    });
    return item.update({ "system.uses.value": value - 5 });
  }
}
