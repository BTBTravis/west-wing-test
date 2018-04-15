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

