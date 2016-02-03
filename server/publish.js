Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'_id': 1, 'emails': 1}});
});

Meteor.publish("websites", function () {
  return Websites.find({});
});

Meteor.publish("votes", function () {
  return Votes.find({});
});

Meteor.publish("comments", function (website_id) {
  return Comments.find({ website_id: website_id });
});
