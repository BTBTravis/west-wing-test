var _ = require('lodash');
var jquery = require('jquery');

export default class MODULE {
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

