//Flips a coin

var quotes = [
  "You thought we could be decent men in an indecent time. But you were wrong. The world is cruel, and the only morality in a cruel world is chance.",
  "Why was it me who was the only one who lost everything?",
  "Remember that name you all had for me when I was at Internal Affairs? What was it?",
  "You're the one pointing the gun, Harvey. So point it at the people responsible.",
  "Tell your boy it's going to be all right. Lie, like I lied."
]

bot.modules.flip = function(from, to, text, message) {
  if(Math.random() >= 0.51) {
    bot.speak('Heads');
  } else if(Math.random() >= 0.04)  {
    bot.speak('Tails');
  } else {
    bot.speak(quotes[Math.floor(Math.random()*quotes.length)]);
  }
};
