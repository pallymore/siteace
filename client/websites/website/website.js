Template.website.helpers({
  hasRecommendations: function () {
    return Votes.findOne({ website_id: this._id, user_id: currentUserId()})
      && recommendations(this).count();
  }
});

Template.recommendations.helpers({
  recommendations: function () {
    return recommendations(this);
  }
});

var recommendations = function (websiteDoc) {
  Meteor.subscribe('websites', websiteDoc.title);

  return Websites.find({ _id: { $ne: websiteDoc._id }}, { $limit: 3 });
};
