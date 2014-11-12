//Lets people leave messages for other people

bot.check_database("tell");

if(fs.readFileSync('./db/tell', 'utf8')) {
  var messages = JSON.parse(fs.readFileSync('./db/tell', 'utf8'));
} else {
  var messages = {};
}

bot.modules.line.tell = function(from, to, text, message) {
  if (messages[from.toLowerCase()]) {
    for (var i in messages[from.toLowerCase()]) {
      bot.speak(from + ": " + irc.colors.wrap("cyan", messages[from.toLowerCase()][i].mes) + irc.colors.wrap("yellow", ' (' + messages[from.toLowerCase()][i].from + ') ') + irc.colors.wrap("light_blue", '[' + readableTime(Date.now()-messages[from.toLowerCase()][i].when) + ']'));
    }
    delete messages[from.toLowerCase()]
    fs.writeFileSync('./db/tell', JSON.stringify(messages)); 
  }
};

bot.modules.tell = function(from, to, text, message) {
  if (from.indexOf('telmac') != -1) return
  var commands = text.split(' ');
  if (bot.ignore && bot.ignore[from] && bot.ignore[from].indexOf(commands[0]) != -1) {
//    bot.speak(from + ': ' + commands[0] + ' is ignoring you')
    return
  }
  if (messages[commands[0].toLowerCase()]) {
    messages[commands[0].toLowerCase()].push({from:from, mes:commands.slice(1).join(' '), when:Date.now()})
  } else {
    messages[commands[0].toLowerCase()] = [{from:from, mes:commands.slice(1).join(' '), when:Date.now()}]
  }
  fs.writeFileSync('./db/tell', JSON.stringify(messages));
};
/*
bot.addListener("message", function(from, to, text, message) {
  if (from == bot.config.master) {
    if (text == ".reload tell") {
      messages = JSON.parse(fs.readFileSync('./db/tell', 'utf8'));
      console.log("Tell database reloaded");
    }
  }
}); */

function readableTime(time) {
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
  return(readable + ' ago');
}
