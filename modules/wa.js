bot.modules.wa = function(from, to, text, mes) {
  request('http://tumbolia.appspot.com/wa/' + encodeURIComponent(text.replace('+','%2B')), function(e, r, body) {
    var answer = body.replace(/&times;/g, ' * ').replace(/&pound;/, '£').replace(/&amp;/g, '&').replace(/&not;/g,'¬').replace(/&gt;/g,'>').replace(/&deg;/g, '°').replace(/&[a-zA-Z]+;/g, '[symbol]').replace('\n', '').replace('\\', '').split(';')
    if (answer[0].indexOf("Couldn't grab") != -1 || answer == []) {
      bot.speak('[\u000304Wolfram\u000f] \u000304Couldn\'t display answer')
    } else {
      bot.speak(('[\u000304Wolfram\u000f] \u000310' + answer[0].replace(/->/g, ' ▶ ') + ((answer[1])?('\u000f = ' + '\u000312' + answer[1].replace(/->/g, ' ▶ ')):'')).replace(/ +/g, ' '))
    }
  })
}
