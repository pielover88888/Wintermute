bot.check_database('ignore');

if (fs.readFileSync('./db/ignore', 'utf8')) {
  bot.ignore = JSON.parse(fs.readFileSync('./db/ignore', 'utf8'));
} else {
  bot.ignore = {};
}

bot.modules.ignore = function(from, to, text, message) {
  var ignored = text.replace(' ', '')
  bot.ignore[ignored] = bot.ignore[ignored] || [];
  if (bot.ignore[ignored].indexOf(from) == -1) {
    bot.ignore[ignored].push(from);
    bot.speak(from + ' is now ignoring ' + ignored)
  } else {
    bot.speak(from + ': You were already ignoring ' + ignored)
  }
  fs.writeFile('./db/ignore', JSON.stringify(bot.ignore));
}

bot.modules.unignore = function(from, to, text, message) {
  var unignored = text.replace(' ', '')
  if (bot.ignore[unignored] && bot.ignore[unignored].indexOf(from) != -1) {
    bot.ignore[unignored].splice(bot.ignore[unignored].indexOf(from), 1);
    if (bot.ignore[unignored] == '') {
      delete bot.ignore[unignored];
    }
    fs.writeFile('./db/ignore', JSON.stringify(bot.ignore));
    bot.speak(from + ' is no longer ignoring ' + unignored)
  } else {
    bot.speak(from + ': You were not ignoring ' + unignored)
  }
}
