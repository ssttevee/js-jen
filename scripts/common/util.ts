export function sortedEntryValues<T>(
  arr: Array<[string, T]>,
): T[] {
  return Object.entries(Object.fromEntries(arr))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, node]) => node);
}
