Template.comments_list.helpers({});

Template.comment_item.helpers({
  commenter: function () {
    if (this.createdBy === Meteor.user()._id) {
      return 'You';
    }
    var user = Meteor.users.findOne({ _id: this.createdBy });

    return user ? user.emails[0].address : 'Unknown User';
  }
});
