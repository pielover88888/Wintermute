bot.check_database('weather')

try {
  var weatherdb = JSON.parse(fs.readFileSync('./db/weather', 'utf8'))
} catch(err) {
  var weatherdb = {}
}

var locAPI = { base:'http://query.yahooapis.com/v1/public/yql',
               opts:'?format=json&q=select%20*%20from%20geo.placefinder%20where%20text=%22' }
var weathAPI = 'http://api.openweathermap.org/data/2.5/'

bot.modules.weather = function(from, to, text, mes, forecast) {
  var locale = (text == (text = text.replace(/ ?-c ?/, ' '))) ? ['imperial','F','mph'] : ['metric','C','m/s']
  var days = text.match(/-[1-7]/) ? text.match(/-[1-7]/)[0].slice(1) : '3'
  text = text.replace(/ ?-[0-9]+ ?/, ' ')
  if (text.replace(' ','')) {
    weatherdb[from.toLowerCase()] = text
    fs.writeFile('./db/weather', JSON.stringify(weatherdb))
  }
  request(locAPI.base + locAPI.opts + ((text).replace(' ','')?text:weatherdb[from.toLowerCase()]) + '%22', function(e, r, body) {
    var data = JSON.parse(body).query
    var locate = (data.count > 1) ? data.results.Result[0] : data.results.Result
    if (forecast) {
      request(weathAPI + 'forecast/daily?cnt='+days+'&units='+locale[0]+'&lat=' + locate.latitude + '&lon=' + locate.longitude, function(e, r, body) {
        var weather = JSON.parse(body)
        bot.speak('Forecast for \u000310' + (locate.line2||locate.country||locate.name) +'\u000f (\u000311' + weather.city.country + '\u000f)')
        weather.list.forEach(function(day, index) {
          bot.speak(((index==0)?'Now':(new Date(day.dt*1000).toString().slice(0,3))) + ': \u000304' + day.temp.min.toFixed(1) + '°'+locale[1]+'\u000f - \u000305'+ day.temp.max.toFixed(1) + '°'+locale[1] +' \u000307'+ day.humidity + '% humidity \u000311'+day.speed.toFixed(1) + locale[2]+' wind\u000f (\u000306' + day.weather[0].main + '\u000f)')
        })
      })
    } else {
      request(weathAPI + 'weather?units='+locale[0]+'&lat=' + locate.latitude + '&lon=' + locate.longitude, function(e, r, body) {
        var weather = JSON.parse(body)
        bot.speak(from + ': [\u000310' + (locate.line2||locate.country||locate.name) +'\u000f (\u000311' + weather.sys.country + '\u000f)] [\u000304' + weather.main.temp + '°'+locale[1]+'\u000f (\u000307' + weather.main.humidity + '% humidity\u000f)] [\u000311Wind: ' + weather.wind.speed + ' ' + locale[2] + ' at ' + weather.wind.deg + '°\u000f] [\u000306' + weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1) + '\u000f]')
      })
    }
  })
}

bot.modules.forecast = function(from, to, text, mes) { bot.modules.weather(from, to, text, mes, true) }
