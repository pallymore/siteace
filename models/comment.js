Comments = new Mongo.Collection("comments");

var isCommentValid = function (doc) {
  return doc.website_id && doc.createdBy && doc.body;
};

Comments.allow({
  insert: function (userId, doc) {
    doc.createdOn = new Date();
    return userId && doc.createdBy === userId && isCommentValid(doc);
  }
});
