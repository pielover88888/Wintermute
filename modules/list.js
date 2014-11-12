bot.modules.list = function(from, to, text, message) {
  bot.speak("Available commands are " + Object.keys(modules).sort().filter(function(i){if (i!='line') return true}).map(function(i){return '.'+i}).join(', '))
}
