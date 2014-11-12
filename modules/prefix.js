//changes command prefix

bot.modules.prefix = function(from, to, text, message) {
  if (from === bot.config.master) {
    bot.config.commandChar = text;
    if (bot.config.commandChar === text) {
      bot.speak('Prefix changed to ' + bot.config.commandChar);
    }
  }
}
