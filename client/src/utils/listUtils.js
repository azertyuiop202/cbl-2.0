export const addOrRemove = (arr, item) => {
  return arr.includes(item) ? arr.filter(i => i !== item) : [ ...arr, item ];
}