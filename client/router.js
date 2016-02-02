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
      return {
        websites: Websites.find({}, { sort: { upvotesCount: -1} })
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
