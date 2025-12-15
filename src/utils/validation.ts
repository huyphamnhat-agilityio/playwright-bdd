export const isAscending = (arr: string[]) => {
  return arr.every(function (x, i) {
    return i === 0 || x >= arr[i - 1];
  });
};

export const isDescending = (arr: string[]) => {
  return arr.every(function (x, i) {
    return i === 0 || x <= arr[i - 1];
  });
};
