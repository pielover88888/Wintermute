//Allows users to silently sign off and have people attempting to communicate with them be informed of this

var aways = {};

bot.modules.away = function(from, to, text, message) {
  if (from == "ayy" || from == "lmao" || from == "lol") {
    bot.whois(from, function(info) {
      if (info.user) {
  	bot.send('MODE', to, '+b', '*!*' + info.user + '@*' + (info.host.match(/\..*/) || info.host));
      }
    });
  }
  //check for someone going away
  aways[from.toLowerCase()] = text
  console.log(from + ' has gone away [' + text + ']');
};

bot.modules.line.away = function(from, to, text, message) {
  //check for an away-ee coming back
  if (from.toLowerCase() in aways) {
    delete aways[from.toLowerCase()]
    console.log(from + ' has come back');
  }
  //check for someone attempting to speak to someone who is away
  if (aways[text.split(' ')[0].replace(/[:,]/, '').toLowerCase()] != undefined) {
    var target = text.split(' ')[0].replace(/[:,]/, '')
    bot.speak(target + ' is currently away' + (aways[target.toLowerCase()]?' [\u000310'+aways[target.toLowerCase()]+'\u000f]':''));
    console.log(from + ' attempted to contact ' + text.split(' ')[0].replace(':', ''));
  }
};
