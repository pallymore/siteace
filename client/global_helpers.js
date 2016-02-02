currentUserId = function () {
  return Meteor.user() ? Meteor.user()._id : null;
}
