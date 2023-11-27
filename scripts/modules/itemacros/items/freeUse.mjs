export async function FREE_USE(item, speaker, actor, token, character, event, args) {
  return item.use({
    createMeasuredTemplate: null,
    consumeResource: null,
    consumeSpellSlot: null,
    consumeUsage: null,
  });
}
