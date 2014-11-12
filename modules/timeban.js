bot.modules.timeban = function(from, to, text, mes) {
  if (from == bot.config.master) {
    var commands = text.split(' ');
    bot.whois(commands[1], function(info) {
      if (info.user) {
        bot.send('MODE', bot.config.channel, '+b', '*!*' + info.user + '@*' + (info.host.match(/\..*/) || info.host))
        setTimeout(function() {
          bot.send('MODE', bot.config.channel, '-b', '*!*' + info.user + '@*' + (info.host.match(/\..*/) || info.host))
        }, commands[0] * 60000)
      }
    });
  }
}
