function currentUserVote(website_id) {
  return Votes.findOne({
    user_id: currentUserId(),
    website_id: website_id
  });
}

Template.rating_timestamp.helpers({
  voteType: function () {
    var vote = currentUserVote(this._id);

    return vote ? (vote.upvote ? 'upvoted' : 'downvoted') : null;
  },
  voteTimestamp: function () {
    return currentUserVote(this._id).createdOn;
  }
});
