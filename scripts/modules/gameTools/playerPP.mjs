/**
 * Show a chat message with all the Players Characters' Passive Perception.
 * @param {boolean} [whisper]     Whether the message should be whispered to the GM.
 * @returns {ChatMessage}         The created chat message.
 */
export async function playerPP({ whisper = true } = {}) {
  // Display all Players Characters' Passive Perception.
  const content = game.users
    .map((i) => i.character)
    .filter((i) => !!i)
    .reduce((acc, c) => {
      let pp = c.system.skills.prc.passive;
      let name = c.name;
      // Add the title only for the first character in the list
      if (acc === "") {
        acc = "<h2>Passive Perception</h2>";
      }
      return acc + `<p><strong>${name}: </strong>${pp}</p>`;
    }, ``);

  const messageData = { content, "flags.core.canPopout": true };
  if (whisper) messageData.whisper = [game.user.id];

  return ChatMessage.create(messageData);
}
