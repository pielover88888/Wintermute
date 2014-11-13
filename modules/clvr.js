

bot.modules.clvr = function(from, to, text, message) {

  var CleverBot = new require('cleverbot-node')
    , clever = new CleverBot()
    , protection = require('../inc/clvr/echo_protection')
    , maybeSpiceUp = require('../inc/clvr/fullmoon_spiceup');

  const ignoreMax = 3600;

  var insult = (function() {
    var insults = [
      '.',
      '..',
      'Get lost.',
      '...',
      'You should be working.',
      'This is not a productive area of discussion.',
      'Do you even lift?'
    ];
    var insIdx = -1;
    return function() {
      insIdx = (insIdx + 1) % insults.length;
      return insults[insIdx];
    };
  }());

  if(!protection.isIgnored(from)) {
    if(protection.isTooSimilar(from, text)) {
      protection.ignore(from, ignoreMax);
      bot.speak(insult());
    }
  }
  else {
    clever.write(text, function(data) {
      var resp = data.message;
      protection.remember(from, resp);
      bot.speak(maybeSpiceUp(resp));
    });
  }
};
