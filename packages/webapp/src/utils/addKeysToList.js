// need to avoid warning in the table, keys need for repeatable elements
export const addKeysToList = list => list.map((item, key) => ({...item, key}));
