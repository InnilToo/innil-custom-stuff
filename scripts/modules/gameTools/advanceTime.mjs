export async function advanceTime(s = null) {
  const content = `
  <p style="text-align: center;">Advance time by a number of seconds.</p>
  <form class="dnd5e">
  <div class="form-group">
    <label>Seconds:</label>
    <div class="form-fields">
      <input type="text" autofocus ${s ? `value="${s}"` : ""}>
    </div>
  </div>
  </form>`;
  const timeInput = await Dialog.prompt({
    title: "Advance Time",
    content,
    label: "Advance!",
    rejectClose: false,
    callback: async (html) => html[0].querySelector("input").value,
  });
  if (!timeInput) return;

  let time;
  try {
    time = Roll.safeEval(timeInput);
  } catch (e) {
    ui.notifications.error(`Failed to parse expression: ${e.message}`);
    return;
  }

  ui.notifications.info(`Advanced time by ${time} seconds.`);
  return game.time.advance(time);
}
