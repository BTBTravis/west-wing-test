var blocks = Array.from(document.querySelectorAll('.expando-block'));

/**
 * Create an expando-block by adding a btn and class if expando-body content is over 3 lines
 * @param {HTMLElement} el - div with class expando-block
 */
var createExpandoBlock = function (el) {
  var init = function () {
    var body = el.querySelector('.expando-body');
    var height = body.clientHeight;
    var maxHeight = 3.4 * parseFloat(getComputedStyle(body).fontSize);
    if(height > maxHeight) {
      makeCollapsible(el);
    }
  };

/**
 * Adds the closed class to find extra content and add a button with toggle event
 * @param {HTMLElement} el - div with class expando-block
 */
  var makeCollapsible = function (el) {
    var btn = document.createElement("button");// create button
    var newContent = document.createTextNode("Read More"); // add txt to button
    btn.appendChild(newContent); // add text to button
    el.querySelector('.expando-footer').appendChild(btn); // add button to footer
    el.querySelector('.expando-body').classList.add('closed'); // close the expando-body
    btn.addEventListener('click', function () {
      el.querySelector('.expando-body').classList.toggle('closed'); // toggle the expando-body
      btn.textContent = /read/ig.test(btn.textContent) ? 'Show Less' : 'Read More';
    });
  }

  // initlize expando-block
  init();
};

blocks.map(function (el) {
  createExpandoBlock(el);
});
