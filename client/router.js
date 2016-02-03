Router.configure({
  layoutTemplate: 'applicationLayout',
  waitOn: function () {
    return [
      Meteor.subscribe("allUserData"),
      Meteor.subscribe('votes')
    ];
  }
});

Router.route('/', function () {
  this.render('welcome', {
    to: "main"
  });
});

Router.route('/websites', function () {
  this.render('websites', {
    to: "main"
  });
});

Router.route('/websites/:_id', function () {
  this.render('website', {
    to: "main",
    data: function () {
      var websiteId = this.params._id;
      Meteor.subscribe("comments", this.params._id);
      Meteor.subscribe("website", this.params._id);

      return _.extend({},
                      Websites.findOne({_id: websiteId}),
                      { comments: Comments.find({ website_id: websiteId }, { sort: { createdOn: -1 } }) });
    }
  });
});
