bot.modules.line.correct = function(from, to, text, message) {
  if (text.match(/^.+\:\ s\/.*\/.*\/[gi]?$/) == text || (text+='/').match(/^.+\:\ s\/.*\/.*\/[gi]?$/) == text) {
    var combtext = text.split(': ')
    bot.whois(combtext[0], function(info){
      if (info.user) {
        var oldtext = new RegExp(combtext[1].match(/\/.*?(?=\/)/g)[0].slice(1), combtext[1].match(/\/[gmi]{0,2}$/)[0].slice(1))
        var newtext = combtext[1].match(/\/.*?(?=\/)/g)[1].slice(1)
        for (i in bot.last) {
          if (bot.last[i].from == combtext[0] && bot.last[i].text.match(oldtext)) {
            bot.speak(from + ' thinks ' + combtext[0] + ' meant to say: ' + irc.colors.codes.cyan + bot.last[i].text.replace(oldtext, newtext))
            break
          }
        }
      }
    })
  } else {
    text = text.slice(0,-1)
  }
  if (text.match(/^s\/.*\/.*\/[gi]?$/) == text || (text+='/').match(/^s\/.*\/.*\/[gi]?$/) == text) {
    var oldtext = new RegExp(text.match(/\/.*?(?=\/)/g)[0].slice(1), text.match(/\/[gmi]{0,2}$/)[0].slice(1))
    var newtext = text.match(/\/.*?(?=\/)/g)[1].slice(1)
    for (i in bot.last) {
      if (bot.last[i].from == from && bot.last[i].text.match(oldtext)) {
        bot.speak(from + ' meant to say: ' + irc.colors.codes.cyan + bot.last[i].text.replace(oldtext, newtext))
        break
      }
    }
  }
}
