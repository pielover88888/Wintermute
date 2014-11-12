//Checks the status of What.cd services

bot.modules.wcd = function(from, to, text, message) {
  var commands = text.split(' ')
  try {
    request('https://whatstatus.info/api/status', function(err, res, body) {
      var status = JSON.parse(body)
      var req = ''
      req += (commands.indexOf('site')+1 || commands == '') ? 'Site: ' + status.site + ' | ' : ''
      req += (commands.indexOf('tracker')+1 || commands == '') ? 'Tracker: ' + status.tracker + ' | ' : ''
      req += (commands.indexOf('irc')+1 || commands == '') ? 'IRC: ' + status.irc + ' | ' : ''
      bot.speak(req.replace(/0/g, '\u000304Down\u000f').replace(/1/g, '\u000303Up\u000f').replace(/ \| $/, ''))
    })
  } catch(e) {
    bot.speak("Failed to get status")
  }
};
