bot.modules.clvr = function(from, to, text, message) {

  bot.speak_test("a");
  var CleverBot = new require('cleverbot-node')
    , clever = new CleverBot()

    clever.write(text, function(data) {
      bot.speak_test("d");
      var resp = data.message;
      protection.remember(from, resp);
      bot.speak_test(resp);
    });
};
