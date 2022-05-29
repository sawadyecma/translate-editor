export function composeNewId(items: { id: number }[]) {
  const maxId = items.reduce((acc, cur) => (cur.id > acc ? cur.id : acc), 0);
  return maxId === 0 ? 1 : maxId + 1;
}
