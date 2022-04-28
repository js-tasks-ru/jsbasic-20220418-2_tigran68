function highlight(table) {
  for (let i = 0; i < table.rows.length;i++) {
    let checkStatus = table.rows[i].cells[3];
    switch (checkStatus.dataset.available) {
    case "true":
      table.rows[i].classList.add("available");
      break;
    case "false":
      table.rows[i].classList.add("unavailable");
      break;
    default:
      table.rows[i].setAttribute('hidden', 'true');
      table.rows[0].removeAttribute('hidden');
      break;
    }
    let checkGender = table.rows[i].cells[2];
    switch (checkGender.innerHTML) {
    case "m":
      table.rows[i].classList.add('male');
      break;
    case "f":
      table.rows[i].classList.add('female');
      break;
    }
    let checkAge = table.rows[i].cells[1];
    if (parseInt(checkAge.innerHTML) < 18) {
      table.rows[i].style = "text-decoration: line-through";
    }
  }
}
