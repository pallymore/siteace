Template.search_form.helpers({
  keyword: function () {
    return window.location.search.split('keyword=')[1];
  }
});

Template.search_form.events({
  'click .js-reset-search-btn': function (event) {
    window.location = '/websites';
  }
});
