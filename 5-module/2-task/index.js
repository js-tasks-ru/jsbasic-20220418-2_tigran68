function toggleText() {
  let but = document.querySelector('button');
  
  but.addEventListener('click', function() {
    let text = document.getElementById('text');
    text.hidden = !text.hidden;
  });
}
