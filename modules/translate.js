bot.modules.translate = function(from, to, text, mes) {
  request('http://translate.google.com/translate_a/t?client=t&sl=auto&tl=en&q=' + text, function(e, r, body) {
    bot.speak(from + ': \u000304[Translation] \u000310' + JSON.parse(body.replace(/,,/g, ',null,').replace(/,,/g, ',').replace(/\[,/g, '[null,'))[0][0][0])
  })
}
