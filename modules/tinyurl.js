//Converts long links into tinyurls

bot.modules.line.tinyurl = function(from, to, text, message) {
  if(text.search(/\bhttps?:\/\/.*?\..*?\b/) !== -1) {
    var url = '' + text.match(/http\S*/);
    if(url.length > 100) {
      request('http://tinyurl.com/api-create.php?url=' + url, function(e, r, body) {
        if (body != "Error" && body.length < 30) {
          bot.speak(irc.colors.codes.orange + body.replace(/^http/, 'https'));
        } else {
          bot.speak("\u000304I am error!");
        }
      });
    }
  }
};
