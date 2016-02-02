Template.website_item.helpers({
  createdBy: function () {
    var website = Websites.findOne({_id: this._id}),
      uploader = Meteor.users.findOne({_id: website.createdBy });
    return uploader ?  uploader.emails[0].address : 'Unknown User';
  }
});
