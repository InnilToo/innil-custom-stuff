export async function _heartOfTheStorm(item) {
  /**
   * The item must be a spell of 1st level or higher, and it must deal either
   * lighting or thunder damage. In addition, its owner must have a feature
   * named 'Heart of the Storm' and must have a token on the scene.
   */
  if (item.type !== "spell") return;
  if (!(item.system.level > 0)) return;
  if (!item.getDerivedDamageLabel().some(({ damageType }) => ["lightning", "thunder"].includes(damageType))) return;
  const hasHeart = item.actor.items.getName("Heart of the Storm");
  if (!hasHeart || hasHeart.type !== "feat") return;
  const token = item.actor.getActiveTokens()[0];
  if (!token) return;

  // Prompt to pick a type.
  const type = await Dialog.wait(
    {
      title: hasHeart.name,
      content: hasHeart.system.description.value,
      close: () => false,
      buttons: {
        thunder: {
          label: "Thunder",
          icon: "<i class='fa-solid fa-cloud-bolt'></i>",
          callback: () => "thunder",
        },
        lightning: {
          label: "Lightning",
          icon: "<i class='fa-solid fa-bolt-lightning'></i>",
          callback: () => "lightning",
        },
      },
    },
    { top: 100, width: 500 }
  );
  if (!type) return;

  /**
   * Pick targets within 10 feet and create the data array for the GM,
   * respecting res, vuls, and imms. The target must not be friendly,
   * must have an actor, and must not be owned by a player. The reduce
   * also ignores any actors with immunity to the damage type, and then
   * sets a multiplier according to resistance and vulnerability.
   */
  const damages = babonus.findTokensInRangeOfToken(token, 10).reduce((acc, token) => {
    if (token.document.disposition === CONST.TOKEN_DISPOSITIONS.FRIENDLY) return acc;
    if (!token.actor) return acc;
    if (token.actor.hasPlayerOwner) return acc;
    const { dr, dv, di } = token.actor.system.traits;
    if (di.value.has(type)) return acc;
    const modifier = dv.value.has(type) ? 1 : dr.value.has(type) ? 0.25 : 0.5;
    acc.push({ modifier, id: token.id, level: item.actor.classes.sorcerer.system.levels });
    return acc;
  }, []);
  if (!damages.length) return;

  // Create a chat message with a button that only the GM can use.
  return ChatMessage.create({
    whisper: ChatMessage.getWhisperRecipients("GM"),
    content: `
    <p>${token.document.name} cast ${item.name} and wants to apply ${type} damage from 'Heart of the Storm'.</p>
    <button data-action="heart-of-the-storm">Apply Damage</button>`,
    speaker: ChatMessage.getSpeaker({ token: token.document }),
    flags: { world: { damages } },
  });
}

export function _heartOfTheStormButton() {
  /**
   * If the user is a GM, apply a hook when a message is rendered to listen for
   * button clicks on any button with 'heart-of-the-storm' in their dataset.
   */
  if (!game.user.isGM) return;
  Hooks.on("renderChatMessage", function (message, html) {
    html[0].querySelector("[data-action='heart-of-the-storm']")?.addEventListener("click", () => {
      for (const { modifier, id, level } of message.flags.world.damages) {
        canvas.scene.tokens.get(id)?.actor?.applyDamage(level, modifier);
      }
    });
  });
}
