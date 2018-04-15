# Westwing Frontend Coding Test - Solutions 

## 1. [Task 1](solution1/solution1.js) (Refactoring)

+ iife to avoid polluting global scope and allow for exit if we don't any .userNodes
+ /get-users-endpoint replaced with mock json api http://localhost:3000/users/ 

```
(function () {
  var usersEls = $('.userNode').toArray()
  if (usersEls.length < 1) return // if we don't have any users on this page exit

  // map over the userEls and load info on their users from the api
  usersEls.map(function (userEl) {
    var userNameEl = $(userEl).find('.name')
    if ($(userEl).is(':visible') && userNameEl.length > 0) { // if the userEl is visable and has a .name child
      userNameEl.css({
        'font-weight': 600,
        'padding-left': '20px'
      })
      userNameEl.text(userNameEl.text() + ' (loading)') // append the loading text to
    }

    var updateUser = function (name, info) {
      $(userEl).find('.name').text(name)
      $(userEl).append(
        $('<div class=userInfo>')
        .text(info)
        .css({
          'font-weight': 300,
          'padding-left': '0px',
        })
      );
    };

    var userId = $(userEl).attr('data-id')

    if (userId) { // if we have a userId get info from the API on this user
      $.ajax({
        url: 'http://localhost:3000/users/' + userId, // TODO: validate and encode userId
        method: 'GET',
        dataType: 'json'
      })
        .then(function (res) { // update some html with this new info
          if(! res.hasOwnProperty('userName') || ! res.hasOwnProperty('userInfo')) throw 'missing info /user in responce'
          updateUser(res.userName, res.userInfo);
        })
        .fail(function (e) {
          console.log('Error retriving userElinfo from server');
          // TODO: alert userElof this error?
        })
    } else { // no userId
      console.log('Error userNode with no data-id attr');
      // TODO: alert userElof this error? remove loading txt?
    }
  });

}());

```

## 2. [Task 2](solution2/solution2.js) (Refactoring to ES6)

+ MODULE was swapped for more discriptive class name

```
var _ = require('lodash');
var jquery = require('jquery');

export default class SetStatus {
  const self = this;
  constructor () => {
    this.els = Array.from(document.querySelectorAll('.elements'));
    this.els.map(el => {
      let id = el.getAttribute('data-id');
      if(!id) return; // if we don't have an id don't attach click event handler
      el.addEventListener('click', () => {
        jquery.ajax({
          url: '/change-status',
          method: 'GET',
          data: {
            id: id
          },
          dataType: 'json',
          success: function (data) {
            if (data.success) self.setElementStatus(data.element.statusText);
          }
        });
      });
    });
  };

  setElementStatus = (id, statusText)  => {
    this.els.map(el => if(el.getAttribute('data-id') == id) jquery(el).find('.status').text(statusText));
  };

}
```
## 3. [Task 3](solution3) (Writing from scratch)


```
(function () {
  var blocks = Array.from(document.querySelectorAll('.expando-block'));
  if (blocks.length < 1) return;
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

}());
```
4. [Task 4](task4.md) (Writing from scratch with React)
