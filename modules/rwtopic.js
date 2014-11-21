//sets the topic with random wikipedia titles

bot.modules.rwtopic = function(from, to, text, message) {
  getTitle(function(word1) {
    getTitle(function(word2) {
	var c = require('irc-colors');
	bot.speak2(to, ":topic set " + c.bold("#wetfish") + " | The " + c.bold(word1) + " to your " + c.bold(word2)); 
	//bot.send("TOPIC", bot.config.channel, 'Wetfish: The ' + word1 + ' to your ' + word2);
    })
  })
}

function getTitle(callback) {
  request('http://en.wikipedia.org/wiki/Special:Random', function(err, res, body) {
    callback(body.match(/.span.*.\/span./)[0].match(/>[^<>]+</)[0].replace(/\ ?\(.*\)\ ?/, '').replace(/(,|:).*/, '').replace(/<|>/g, ''));
  });
}
