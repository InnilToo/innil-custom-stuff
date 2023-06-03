/**
 * Show a chat message with all the Players Characters' languages in a table format.
 * @param {boolean} [whisper]           Whether the message should be whispered to the GM.
 * @returns {Promise<ChatMessage>}      The created chat message.
 */
export async function playerLanguages({ whisper = true } = {}) {
  // Display all Players Characters' languages.
  const content = game.users
    .map((i) => i.character)
    .filter((i) => !!i)
    .reduce((acc, c) => {
      const lang = [...c.system.traits.languages.value]
        .map((i) => i.capitalize())
        .join(", ");
      let name = c.name;
      // Add the title only for the first character in the list
      if (acc === "") {
        acc = "<h2>Languages</h2>";
      }
      return acc + `<p><strong>${name}:</strong></br>${lang}</p>`;
    }, ``);

  const messageData = { content, "flags.core.canPopout": true };
  if (whisper) messageData.whisper = [game.user.id];

  return ChatMessage.create(messageData);
}
