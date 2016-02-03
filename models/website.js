Websites = new Mongo.Collection("websites");

Websites.allow({
  insert: function (userId, doc) {
    return Meteor.user() && doc.createdBy === Meteor.user()._id;
  }
});
