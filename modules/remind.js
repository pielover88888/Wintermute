//Lets users leave reminders for themselves

bot.check_database('remind');

if(fs.readFileSync('./db/remind', 'utf8')) {
  var reminders = JSON.parse(fs.readFileSync('./db/remind', 'utf8'));
} else {
  var reminders = [];
}

bot.modules.remind = function(from, to, text, message) {
  var commands = text.split(' ');
  var htime = (commands[0].toLowerCase() == '-f') ? commands[1] : commands[0];
  var ptime = 0;

  ptime += (htime.match(/[0-9.]*s/)||'0')[0].match(/[0-9.]*/)[0] * 1000
  ptime += (htime.match(/[0-9.]*m/)||'0')[0].match(/[0-9.]*/)[0] * 60000
  ptime += (htime.match(/[0-9.]*h/)||'0')[0].match(/[0-9.]*/)[0] * 3600000
  ptime += (htime.match(/[0-9.]*d/)||'0')[0].match(/[0-9.]*/)[0] * 86400000

  var time = Date.now() + ptime;

  if (commands[0].toLowerCase() == '-f') {
    setTimeout(function() {
      bot.speak(from + ': ' + irc.colors.wrap("light_blue", commands.slice(2).join(' ')))
    }, ptime)
  } else {
    if (reminders[from]) {
      reminders[from].push({t: time, m: commands.slice(1).join(' ')})
    } else {
       reminders[from] = [{t: time, m: commands.slice(1).join(' ')}]
    }
    fs.writeFile('./db/remind', JSON.stringify(reminders));
  }
};

bot.modules.line.remind = function(from, to, text, message) {
  if (reminders[from]) {
    for (var i in reminders[from]) {
      if (reminders[from][i].t <= Date.now()) {
        bot.speak(from + ": " + irc.colors.wrap("light_blue", reminders[from][i].m));
        reminders[from].splice(i,1);
        fs.writeFile('./db/remind', JSON.stringify(reminders));
        i--
      }
    }
  }
};
