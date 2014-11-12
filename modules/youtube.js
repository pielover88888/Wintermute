bot.modules.line.youtube = function(from, to, text, message) {
  if (text.match(/(youtube.com\/watch\S*v=|youtu.be\/)([\w-]+)/)) {
    request('http://gdata.youtube.com/feeds/api/videos/' + text.match(/(youtube.com\/watch\S*v=|youtu.be\/)([\w-]+)/)[2] + '?v=2&alt=json', function(e, r, body){
      var data = JSON.parse(body)
      var output = ''
      output += '\u00031,00You\u00030,04Tube\u000f '
      output += '[\u000310' + data.entry.title.$t + '\u000f] '
      var t = data.entry.media$group.yt$duration.seconds
      var time = [Math.floor(t/3600), (Math.floor(t/60)-(Math.floor(t/3600)*60)), t%60]
      if (!time[0]) time.shift()
      output += '[' + time.reduce(function(a,b){return a + ':' + ('0'+b).substr(-2)}) + '] '
      output += (data.entry.yt$rating)?'[\u000303' + data.entry.yt$rating.numLikes + '\u000f|\u000304' + data.entry.yt$rating.numDislikes + '\u000f]':''
      bot.speak(output)
    })
  }
}
