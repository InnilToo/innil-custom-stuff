/**
 * Show a chat message with all the Players Characters' Hit Points.
 * @param {boolean} [whisper]     Whether the message should be whispered to the GM.
 * @returns {ChatMessage}         The created chat message.
 */
export async function playerHP({ whisper = true } = {}) {
  // Display all Players Characters' Hit Points.
  const content = game.users
    .map((i) => i.character)
    .filter((i) => !!i)
    .reduce((acc, c) => {
      let hp_value = c.system.attributes.hp.value;
      let hp_max = c.system.attributes.hp.max;
      let hp_temp = c.system.attributes.hp.temp ?? "";
      let name = c.name;
      if (hp_temp) {
        hp_temp = c.system.attributes.hp.temp + "+";
      }
      // Add the title only for the first character in the list
      if (acc === "") {
        acc = "<h2>Hit Points</h2>";
      }
      return acc + `<p><strong>${name}:</strong> ${hp_temp}${hp_value}/${hp_max}</p>`;
    }, ``);

  const messageData = { content, "flags.core.canPopout": true };
  if (whisper) messageData.whisper = [game.user.id];

  return ChatMessage.create(messageData);
}
