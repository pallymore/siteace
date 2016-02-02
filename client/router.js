Router.configure({
  layoutTemplate: 'applicationLayout',
  waitOn: function () {
    return [Meteor.subscribe("allUserData")];
  }
});

Router.route('/', function () {
  this.render('welcome', {
    to: "main"
  });
});

Router.route('/websites', function () {
  this.render('websites', {
    to: "main",
    data: function () {
      var websites = Websites.find({});

      websites = _.sortBy(websites.map(function (website) {
        return _.extend({}, website, {
          upvotesCount: Votes.find({ website_id: website._id, upvote: true }).count()
        });
      }), function (website) { return -website.upvotesCount; });

      return {
        websites: websites
      };
    }
  });
});

Router.route('/websites/:_id', function () {
  this.render('website', {
    to: "main",
    data: function () {
      var websiteId = this.params._id;
      return _.extend({},
                      Websites.findOne({_id: websiteId}),
                      { comments: Comments.find({ website_id: websiteId }, { sort: { createdOn: -1 } }) });
    }
  });
});
