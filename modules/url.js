var url = require('url')

var HTMLchars = {'&nbsp;':' ','&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#x27;':"'",'&apos;':"'",'&ndash;':'-','&mdash;':'-','&infin;':'∞','&raquo;':'»','&laquo;':'«','&middot;':'•','&hellip;':'...'}

bot.modules.line.url = function(from, to, text, mes) {
    if(from == "tumblrina") {
	return;
    };

  if(text.search(/\bhttps?:\/\/.*?\..*?\b/) !== -1) {
    if (text.search(/youtu((.be)|(be.com))/) !== -1) { return }
    var link = '' + text.match(/http\S*/)
    var ua = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:26.0) Gecko/20100101 Firefox/26.0'}
    var body = ''
    request({url: link, encoding: 'utf8', headers: ua}).on('data', function(chunk) {
      body += chunk
      if (body.length > 64000) this.abort()
    }).on('end', function() {
      try {
        var title = body.match(/<title>[\s\S]*?<\/title>/)[0].slice(7, -8)
        title = title.replace(/&#[0-9]*;/g, function(c) {return String.fromCharCode(c.match(/[0-9]+/)[0])})
        title = title.replace(/&[a-z#0-9]*;/g, function(c) {return HTMLchars[c]||c})
        title = title.replace(/(\r)|(\n)/g, '').replace(/\s+/g, ' ')
        title = title.slice(0, 80).replace(/(^\s)|(\s$)/g, '')
        bot.speak('[\u000310 ' + title + ' \u000f] -\u000304 ' + url.parse(link).host)
      } catch(err) {}
    })
  }
}
