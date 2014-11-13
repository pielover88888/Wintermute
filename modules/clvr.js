bot.modules.clvr = function(from, to, text, message) {
  var Cleverbot = require('cleverbot-node');
  var CBots = [new Cleverbot,new Cleverbot]
  , i = 0
  , callback = function callback(resp){
    CBots[i].write(resp['text'],callback);
    bot.speak_test(resp['text']);
  };
}
