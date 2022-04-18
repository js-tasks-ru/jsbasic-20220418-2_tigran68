function ucFirst(str) {
  if (str === '') {
    return '';
  } else {
    str = str.split('');
    str[0] = str[0].toUpperCase();
    str = str.join('');
    return str;
  }
}
