bot.check_database('lastfm')

try {
  var lastfm = JSON.parse(fs.readFileSync('./db/lastfm', 'utf8'))
} catch(err) {
  console.log(err)
  var lastfm = {}
}

bot.modules.fm = function(from, to, text, mes) {
  if (text) {
    lastfm[from] = text.replace(' ', '')
    fs.writeFile('./db/lastfm', JSON.stringify(lastfm))
    bot.speak(from + ' associated with lastfm user ' + text)
  } else {
    if (lastfm[from]) {
      request('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + lastfm[from] + '&api_key=1d234424fd93e18d503758bf2714859e&format=json', function(e, r, body) {
        try {
          var track = JSON.parse(body)['recenttracks']['track'][0]
          bot.speak(from + ' is listening to: \u000310' + track.artist['#text'] + '\u000f - \u000304' + track.name + ((track.album['#text'])?('\u000f (\u000307' + track.album['#text']+ '\u000f)'):''))
        } catch(err) {
          console.log('[LASTFM] ' + err)
          bot.speak('\u000304A problem was encountered')
        }
      })
    } else {
      bot.speak('No lastfm user associated with ' + from)
    }
  }
}
