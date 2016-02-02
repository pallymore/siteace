Template.website_form.created = function () {
  this.errorMessage = new ReactiveVar(null);
  this.resetForm = function () {
    this.errorMessage.set(null);
    $('#website_form input').val('');
  };
};

Template.website_form.helpers({
  errorMessage: function () {
    return Template.instance().errorMessage.get();
  }
});

Template.website_form.events({
  "click .js-toggle-website-form": function () {
    $("#website_form").modal('show');
  },
  "hidden.bs.modal #website_form": function (event, template) {
    template.resetForm();
  },
  "submit .js-save-website-form": function (event, template){
    var evt = event.target,
      url = evt.url.value.trim(),
      title = evt.title.value.trim(),
      description = evt.description.value;

    if (url && title) {
      Websites.insert({
        title: title,
        url: url,
        description: description,
        createdBy: Meteor.user()._id,
        createdOn: new Date()
      });

      $('#website_form .close').click();
    } else {
      template.errorMessage.set('Address and Title cannot be empty');
    }

    return false;
  },
  "blur #url": function (event, template) {
    var url = event.target.value;

    if (url && url.length > 0) {
      template.errorMessage.set(null);
      Meteor.call('getWebsiteDetails', url, function (err, obj) {
        if (err) {
          template.errorMessage.set(err.details);
          return false;
        }

        $('#title').val(obj.title);
        $('#description').val(obj.description);
      });
    }
  }
});
