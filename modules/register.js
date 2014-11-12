bot.check_database('register')

try {
  var regdb = JSON.parse(fs.readFileSync('./db/register', 'utf8'))
} catch(err) {
  var regdb = {}
}

var crypto = require('crypto')

bot.modules.register = function(from, to, text, mes) {
  if (from.toLowerCase() in regdb) {
    if (crypto.createHash('md5').update(text+'horse').digest('hex') === regdb[from.toLowerCase()].pass) {
      bot.send('MODE', bot.config.channel, '+'+regdb[from.toLowerCase()].modes, from)
    } else {
      bot.say(from, 'Incorrect password for nick "' + from + '". Authorization failed.')
    }
  } else {
    regdb[from.toLowerCase()] = {pass:crypto.createHash('md5').update(text+'horse').digest('hex')}
    fs.writeFile('./db/register', JSON.stringify(regdb))
    bot.say(from, 'Nick "' + from + '" registered.')
  }
}

bot.modules.chmod = function(from, to, text, mes) {
  if (from === bot.config.master) {
    var args = text.split(' ')
    if (regdb[args[1].toLowerCase()]) {
      regdb[args[1].toLowerCase()].modes = regdb[args[1].toLowerCase()].modes||''
      if ('+-'.indexOf(args[0].charAt(0)) === -1) { args[0] = '+'+args[0] }
      var m = args[0].slice(1).split('')
      for (i in m) {
        if (args[0].charAt(0) === '+') {
          if (regdb[args[1].toLowerCase()].modes.indexOf(m[i]) === -1) {
            regdb[args[1].toLowerCase()].modes += m[i]
            bot.send('MODE', bot.config.channel, '+'+m[i], args[1])
          }
        } else {
          regdb[args[1].toLowerCase()].modes = regdb[args[1].toLowerCase()].modes.replace(m[i], '')
          bot.send('MODE', bot.config.channel, '-'+m[i], args[1])
        }
      }
      fs.writeFile('./db/register', JSON.stringify(regdb))
      bot.speak(args[0] + " set for " + args[1])
    } else {
      bot.say(from, "User "+args[1]+" not registered")
    }
  }
}
