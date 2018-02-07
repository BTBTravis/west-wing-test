/*
 * TASK 2: Refactoring to ES6
 *
 * Please implement the same code using ES6. Refactor the code if needed.
 */

var _ = require('lodash');
var jquery = require('jquery');

var MODULE = function () {
    this.init();
};

MODULE.prototype.init = function () {
    var self = this;

    jquery('.elements').each(function () {
        jquery(this).on('click', function () {
            var element = this;

            jquery.ajax({
                url: '/change-status',
                method: 'GET',
                data: {
                    id: jquery(element).attr('data-id')
                },
                dataType: 'json',
                success: function (data) {
                    if (data.success) self.setElementStatus(data.element.statusText);
                }
            });
        });
    });
};

MODULE.prototype.setElementStatus = function (id, statusText) {
	jquery('.elements').each(function () {
		if (jquery(this).attr('data-id')==id) {
			jquery(this).find('.status').text(statusText);
		});
	});
};

module.exports = MODULE;
