Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'_id': 1, 'emails': 1}});
});

Meteor.publish("website", function (id) {
  return Websites.find({_id: id});
});

Meteor.publish("websites", function (searchKeyword) {
  if (!searchKeyword) {
    return Websites.find({});
  }

  return Websites.find(
    {
      $text: { $search: searchKeyword }
    },
    {
      fields: { score: { $meta: "textScore" } },
      sort: { score: { $meta: "textScore" } }
    }
  );
});

Meteor.publish("votes", function () {
  return Votes.find({});
});

Meteor.publish("comments", function (website_id) {
  return Comments.find({ website_id: website_id });
});
