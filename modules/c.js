//Does math

var mathjs = require('mathjs')
    //mathjs = Mathjs();
//mathjs.import('numbers')
mathjs.config({matrix: 'matrix'})
var parser = mathjs.parser();

bot.modules.c = function(from, to, text, message) {
  if (text.indexOf('!') + text.indexOf('factorial') != -2) {bot.speak("\u000304Factorials disabled"); return 0}
  try {
    bot.speak(('' + mathjs.format(parser.eval(text), {precision: 14})).replace('undefined','Error parsing input'))
  } catch(e) {
    bot.speak("Error parsing input")
  }
};
