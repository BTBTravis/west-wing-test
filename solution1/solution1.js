/* Notes
 * iife to avoid polluting global scope and allow for escape
 * added comments as needed
 * swapped the /get-users-endpoint for /users a mock endpoint available via json-server. you can start that with npm run api
*/

(function () {
  var usersEls = $('.userNode').toArray() // toArray so we can use js map
  if (usersEls.length < 1) return null // if we don't have any users on this page escape

  // map over the userEls and load info on their users from the api
  usersEls.map(function (userEl) {
    // if the userEl is visable
    if ($(userEl).is(':visible')) {
      var userNameEl = $(userEl).find('.name')
      if(userNameEl.length > 0) { // if we don't have a userNameEl don't update styles
          userNameEl.css({
            'font-weight': 600,
          'padding-left': '20px'
        })
      }
      userNameEl.text(userNameEl.text() + ' (loading)')
    }

    var userId = $(userEl).attr('data-id')

    if(userId) { // if we have a userId get info from the API on this user
      $.ajax({
        //url: '/get-users-endpoint',
        url: 'http://localhost:3000/users/' + userId,
        method: 'GET',
        dataType: 'json'
      })
        .then(function (res) { // update some html with this new info
          $(userEl).find('.name').text(res.userName)
          $(userEl).append(
            $('<div class=userInfo>')
            .text(res.userInfo)
            .css({
              'font-weight': 300,
              'padding-left': '0px',
            })
          )
        })
      .fail(function (e) {
        console.log('Error retriving userElinfo from server');
        // TODO: alert userElof this error?
      })
    } else { // no userElid found
      console.log('Error userNode with no data-id attr');
      // TODO: alert userElof this error? remove loading txt?
    }
  });
}());

