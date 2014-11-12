//Rolls dice

var cheat = false;

bot.modules.roll = function(from, to, text, message) {
  var commands = text.split(' ');
  var dieType = 6;
  for (var i = 0; i < commands.length; i++) {
    if (commands[i].match(/^d[0-9]*$/)) {
      dieType = commands[i].slice(1);
      commands.splice(i,1);
    }
  }
  if (dieType > 100) {
    dieType = 100;
    bot.speak("Die size reduced to 100");
  }
  var dice = Math.floor(commands[0].match(/[0-9]*/))
  if (dice > 256) {
    dice = 256;
    bot.speak("Number of rolls reduced to 256");
  }
  var rolls = '',
      total = 0;
  for (i = 0; i < dice; i++) {
    if (from == bot.config.master && cheat) {
      var rand = dieType;
    } else {
      var rand = (Math.floor((Math.random()*dieType)+1));
    }
    rolls += (rand + " ");
    total += parseInt(rand);
  }
  bot.speak(rolls);
  if(dice > 1) {
    bot.speak("Total: " + total);
  }
};

bot.addListener("pm", function(from, text, message) {
  if (from === bot.config.master) {
    var commands = text.split(" ");
    if (commands[0] == ".cheat") {
      if (commands[1] == "on") {
        cheat = true;
      } else {
        cheat = false;
      }
    }
  }
});
