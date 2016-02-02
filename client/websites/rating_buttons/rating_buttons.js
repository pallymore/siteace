function setErrorMessage(template, message) {
  template.errorMessage.set(message);
}

Template.rating_buttons.created = function () {
  this.errorMessage = new ReactiveVar(null);
};

// TODO: display color by vote type

function handleVote(user_id, website_id, isUpvote) {
  var existingVote = Votes.findOne({ website_id: website_id, user_id: user_id });

  if(!existingVote) {
    Votes.insert({
      website_id: website_id,
      user_id: user_id,
      upvote: isUpvote,
      createdOn: new Date()
    });
    return false;
  }

  if(existingVote.upvote !== isUpvote) {
    setErrorMessage(this, 'Your vote has been updated.');
    Votes.update({
      _id: existingVote._id
    }, { $set: {
      upvote: isUpvote,
      createdOn: new Date()
    }});
    return false;
  } else {
    Votes.remove({ _id: existingVote._id });
  }

  return false; // prevent the button from reloading the page
}

Template.rating_buttons.events({
  "click .js-upvote" : function (event, template){
    var website_id = this._id,
      currentUser = Meteor.user();

    setErrorMessage(template, null);

    if (!currentUser) {
      setErrorMessage(template, 'Please login to vote');
      return false;
    }

    return handleVote.call(template, currentUser._id, website_id, true);
  },
  "click .js-downvote": function (event, template){
    var website_id = this._id,
      currentUser = Meteor.user();

    setErrorMessage(template, null);

    if (!currentUser) {
      setErrorMessage(template, 'Please login to vote');
      return false;
    }

    return handleVote.call(template, currentUser._id, website_id, false);
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

