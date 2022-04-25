function getMinMax(str) {
  str = str.split(' ').map(el => parseFloat(el));
  str = str.filter(num => !isNaN(num));
  let res = {
    min: Math.min(...str),
    max: Math.max(...str)
  };
  return res;
}
