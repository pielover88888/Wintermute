bot.modules.py = function(from, to, text, mes) {
  request('http://tumbolia.appspot.com/py/' + text, function(e, r, body) {
    bot.speak((body.length < 300)?('\u000310' + body):('\u000304Bad Request'))
  })
}
