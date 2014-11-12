//Description

bot.addListener("nick", function(oldnick, newnick, channels, message) {
  if(oldnick == bot.config.master) {
    bot.config.master = newnick;
  }
});

bot.modules.master = function(from, to, text, message) {
  if(from === bot.config.master) {
    bot.speak(bot.config.master);
  }
};
