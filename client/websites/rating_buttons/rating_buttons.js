function userUpvote(user_id ,website_id) {
  return Votes.findOne({
    user_id: user_id,
    website_id: website_id,
    upvote: true
  });
}

function userDownvote(user_id ,website_id) {
  return Votes.findOne({
    user_id: user_id,
    website_id: website_id,
    upvote: false
  });
}

function setErrorMessage(template, message) {
  template.errorMessage.set(message);
}

Template.rating_buttons.created = function () {
  this.errorMessage = new ReactiveVar(null);
};

// TODO: simplify! user can only have one vote! (remove or update!)
// TODO: display color by vote type

Template.rating_buttons.events({
  "click .js-upvote" : function (event, template){
    var website_id = this._id,
      currentUser = Meteor.user();

    if (currentUser) {
      var existingUpvote = userUpvote(currentUser._id, website_id);
      if(!existingUpvote) {
        var downvote = userDownvote(currentUser._id, this._id);
        if (downvote) { Votes.remove({ _id: downvote._id }); }
        Votes.insert({
          website_id: this._id,
          user_id: currentUser._id,
          upvote: true,
          createdOn: new Date()
        });
      } else {
        Votes.remove({ _id: existingUpvote._id });
      }
      setErrorMessage(template, null);
    } else {
      setErrorMessage(template, 'Please login to vote');
    }

    return false; // prevent the button from reloading the page
  },
  "click .js-downvote": function (event, template){
    var website_id = this._id,
      currentUser = Meteor.user();

    if (currentUser) {
      var existingDownvote = userDownvote(currentUser._id, website_id);
      if(!existingDownvote) {
        var upvote = userUpvote(currentUser._id, this._id);
        if (upvote) { Votes.remove({ _id: upvote._id }); }
        Votes.insert({
          website_id: this._id,
          user_id: currentUser._id,
          upvote: false,
          createdOn: new Date()
        });
      } else {
        Votes.remove({ _id: existingDownvote._id });
      }
      setErrorMessage(template, null);
    } else {
      setErrorMessage(template, 'Please login to vote');
    }


    return false; // prevent the button from reloading the page
  }
});

Template.rating_buttons.helpers({
  upvotesCount: function () {
    return Votes.find({
      website_id: this._id,
      upvote: true
    }).count();
  },
  downvotesCount: function () {
    return Votes.find({
      website_id: this._id,
      upvote: false
    }).count();
  },
  errorMessage: function () {
    return Template.instance().errorMessage.get();
  }
});

