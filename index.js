var scraper = require('cheerio');
var request = require('request');

request('https://apps.carleton.edu/campus/registrar/schedule/enroll/?term=18WI&subject=ECON', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = scraper.load(html);
  }
});
