export async function HIT_DIE_APPLY(item, speaker, actor, token, character, event, args) {
  const use = await item.use();
  if (!use) return;
  return actor.rollHitDie(undefined, { dialog: false });
}
