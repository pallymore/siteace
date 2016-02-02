Meteor.methods({
  getWebsiteDetails: function (url) {
    var content, $;
    try {
      content = Meteor.http.get(url).content;
    } catch(e) {
      throw new Meteor.Error(500, 'Error 500: URL is invalid', e.message);
    }

    $ = cheerio.load(content);

    return {
      title: $('title').text(),
      description: $('meta[name="description"]').attr('content')
    };
  }
});
