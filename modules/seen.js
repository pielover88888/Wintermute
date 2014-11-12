//Record the last time someone spoke and give the difference to now when asked

bot.check_database("seen");

try {
  var people = JSON.parse(fs.readFileSync('./db/seen', 'utf8'));
} catch(err) {
  console.log(err);
  var people = {};
}

function readable_time(time) {
  var days = Math.floor(time/86400000),
      hours = Math.floor(time/3600000) - (days * 24),
      minutes = Math.floor(time/60000) - (hours * 60) - (days * 1440);
  var readable = ''
  if (time < 60000) {
    readable = "less than a minute";
  } else {
    //Fuck yeah nested ternary operators. Unreadable as hell
    days = (days == 0) ? '' : (days == 1) ? (days + ' day') : (days + ' days');
    hours = (hours == 0) ? '' : (hours == 1) ? (hours + ' hour') : (hours + ' hours');
    minutes = (minutes == 0) ? '' : (minutes == 1) ? (minutes + ' minute') : (minutes + ' minutes');

    if (days != '') {
      days += (hours != '' && minutes != '') ? ', ' : ((hours == '' && minutes != '') || (hours != '' && minutes == '')) ? ' and ' : '';
    }
    if (hours != '' && minutes != '') {
      hours += ' and ';
    }
    readable = days + hours + minutes;
  }
  return(readable);
}

//Update object of people
bot.modules.line.seen = function(from, to, text, mes) {
  people[from.toLowerCase()] = {d: Date.now(), l: text};
  fs.writeFileSync('./db/seen.tmp', JSON.stringify(people));
  fs.renameSync('./db/seen.tmp', './db/seen')
};

bot.modules.seen = function(from, to, text, mes) {
  var commands = text.split(' ');
  var last = false;
  if (commands[0] == "-l") {
    commands.splice(0,1)
    last = true
  }
  if (people[commands[0].toLowerCase()]) {
    if (last && people[commands[0].toLowerCase()].l) {
      bot.speak("Last heard from \u000308" + commands[0] + '\u000f ' + readable_time(Date.now() - people[commands[0].toLowerCase()].d) + ' ago with \u000312"'+ people[commands[0].toLowerCase()].l+'"')
    } else {
      bot.speak("Last heard from \u000308" + commands[0] + '\u000f ' + readable_time(Date.now() - people[commands[0].toLowerCase()].d) + ' ago');
    }
  } else {
    bot.speak("Sorry, I haven't seen " + commands[0])
  }
};

bot.modules.since = function(from, to, text, mes) {
  var since = []
  for (person in people) {
    if (people[person].d >= Date.now()-(((text>1440)?1440:text)*60000)) since.push(person)
  }
  bot.speak('In the last ' + text + ' minutes, I\'ve seen ' + since.join(', '))
}
