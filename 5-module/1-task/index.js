function hideSelf() {
  let but = document.querySelector('button');
  
  but.addEventListener('click', function() {
    but.hidden = true;
  });
}
