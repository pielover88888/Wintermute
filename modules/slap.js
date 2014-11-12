//Slaps people

bot.modules.slap = function(from, to, text, message) {
  var commands = text.split(' ');
  if (commands[0]) {
    bot.whois(commands[0], function(info) {
      if (info.user) {
        bot.action(bot.config.channel, "slaps " + info.nick);
      }
    });
  } else {
    bot.action(bot.config.channel, "slaps " + from);
  }
};
