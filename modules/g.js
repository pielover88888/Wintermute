bot.modules.g = function(from, to, text, mes) {
  request('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=1&safe=off&q=' + text, function(e, r, body) {
    bot.speak(from + ':\u000310 ' + JSON.parse(body).responseData.results[0].unescapedUrl)
  })
}
