//lists commands

bot.modules.commands = function(from, to, text, message) {
  //bot.speak('Available commands are: ' + Object.keys(bot.modules).map(function(x){return bot.config.commandChar+x}).sort().join(', ').replace(bot.config.commandChar+'line, ',''))
    bot.say(from, 'Available commands are: ' + Object.keys(bot.modules).map(function(x){return bot.config.commandChar+x}).sort().join(', ').replace(bot.config.commandChar+'line, ',''))
}
