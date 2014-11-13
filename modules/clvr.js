bot.modules.clvr = function(from, to, text, message) {
  bot.speak_test("a");
  var CleverBot = new require('cleverbot-node')
    , clever = new CleverBot()
    , maybeSpiceUp = require('../inc/clvr/fullmoon_spiceup');

    clever.write(text, function(data) {
      bot.speak_test("d");
      var resp = data.message;
      protection.remember(from, resp);
      bot.speak(maybeSpiceUp(resp));
    });
};
