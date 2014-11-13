bot.modules.clvr = function(from, to, text, message) {
var CleverBot = new require('cleverbot-node')
  , clever = new CleverBot()

  clever.write(text, function(data) {
    bot.speak(data.message);
  });
};
