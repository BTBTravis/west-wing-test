/*
 * TASK 1: Refactoring
 *
 * Please correct and refactor the code below.
 */

users = $('.userNode')

for (i = 0; i < users.length; i++) {
    userName = $('.userNode:eq(' + i + ') .name')

    if ($('.userNode:eq(' + i + ')').is(':visible')) {
        userName.css({ 'font-weight': 600, 'padding-left': '20px' })
        userName.text(userName.text() + ' (loading)')
    }

    userIds = new Array()
    userIds.push($('.userNode:eq(' + i + ')').attr('data-id'))

    $.ajax({
        url: '/get-users-endpoint',
        method: 'POST',
        data: {
            userIds: userIds
        },
        dataType: 'json',
        success: function (data) {
            $('.userNode:eq(' + i + ') .name').text(data.users[0].userName)
            $('.userNode:eq(' + i + ')').append('<div class=userInfo></div>')
            $('.userNode:eq(' + i + ') .userInfo').text(data.users[0].userInfo)
            $('.userNode:eq(' + i + ') .name')css({ 'font-weight': 300, 'padding-left': '0px' })
        }
    })
}
