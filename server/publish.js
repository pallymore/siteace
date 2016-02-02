Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'_id': 1, 'emails': 1}});
});
