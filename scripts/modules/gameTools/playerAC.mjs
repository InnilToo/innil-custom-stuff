/**
 * Show a chat message with all the Players Characters' Armor Class.
 * @param {boolean} [whisper]     Whether the message should be whispered to the GM.
 * @returns {ChatMessage}         The created chat message.
 */
export async function playerAC({ whisper = true } = {}) {
  // Display all Player Charactes' Armor Class
  const content = game.users
    .map((i) => i.character)
    .filter((i) => !!i)
    .reduce((acc, c) => {
      let ac = c.system.attributes.ac.value;
      let name = c.name;
      // Add the title only for the first character in the list
      if (acc === "") {
        acc = "<h2>Armor Class</h2>";
      }
      return acc + `<p><strong>${name}: </strong>${ac}</p>`;
    }, ``);

  const messageData = { content, "flags.core.canPopout": true };
  if (whisper) messageData.whisper = [game.user.id];

  return ChatMessage.create(messageData);
}
