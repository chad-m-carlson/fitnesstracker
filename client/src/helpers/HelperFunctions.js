export const getSimpleDate = (date) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let simpleDate = `${month}${day}${year}`
  return simpleDate
}