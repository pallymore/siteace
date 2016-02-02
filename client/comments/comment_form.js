Template.comment_form.events({
  "submit .js-add-comment-form": function (event) {
    event.preventDefault();
    var content = $.trim(_.escape($('#commentBody').val()));

    if (Meteor.user() && content.length > 0) {
      Comments.insert({
        body: content,
        website_id: this._id,
        createdBy: Meteor.user()._id,
        createdOn: new Date()
      });
      $('#commentBody').val('');
    }

    return false;
  }
});
