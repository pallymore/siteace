Template.website_list.helpers({
  websites: function () {
    var searchKeyword = searchKeywordFromQueryParams();
    Meteor.subscribe('websites', searchKeyword);

    if (searchKeyword) {
      return Websites.find({}, { sort: [["score", "desc"]] });
    }

    return Websites.find({});
  },
  searchKeyword: function () {
    return searchKeywordFromQueryParams();
  },
  hasResults: function (cursor) {
    return cursor.length || cursor.count() > 0;
  },
  orderedWebsites: function (websites) {
    websites = _.sortBy(websites.map(function (website) {
      return _.extend({}, website, {
        upvotesCount: Votes.find({ website_id: website._id, upvote: true }).count()
      });
    }), function (website) { return -website.upvotesCount; });

    return websites;
  }
});

var searchKeywordFromQueryParams = function () {
  return window.location.search.split('keyword=')[1];
};
