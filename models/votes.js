Votes = new Meteor.Collection('votes');

Votes.allow({
  insert: function (userId, doc) {
    return userId &&
      userId === doc.user_id &&
      doc.website_id &&
      !Votes.findOne({
        user_id: doc.user_id,
        website_id: doc.website_id
      });
  },
  update: function (userId, doc) {
    return userId && userId === doc.user_id;
  },
  remove: function (userId, doc) {
    return userId && userId === doc.user_id;
  }
});
