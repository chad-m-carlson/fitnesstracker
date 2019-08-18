export const getSimpleDate = (date) => {
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  let year = date.getUTCFullYear();
  let simpleDate = `${month}${day}${year}`
  return simpleDate
}