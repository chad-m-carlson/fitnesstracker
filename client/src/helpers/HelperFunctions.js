export const getSimpleDate = (date) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let simpleDate = `${month}${day}${year}`
  return simpleDate
}

export const sortExercises = (exerciseArray, sortBy) => {
  let x = exerciseArray.sort(function(a, b) {
    if (typeof(a[sortBy]) == 'number' || typeof(b[sortBy]) == 'number'){
      var nameA = a[sortBy];
      var nameB = b[sortBy];
    }else {
      var nameA = a[sortBy].toUpperCase(); // ignore upper and lowercase
      var nameB = b[sortBy].toUpperCase(); // ignore upper and lowercase
    }
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return x
}
