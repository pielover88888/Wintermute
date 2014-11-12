//Contacts an admin

var admins = ["rachel", "Weazzy", "svchost"];

bot.modules.admin = function(from, to, text, message) {
  if (text.length > 1) {
    for (admin in admins) {
      bot.say(admins[admin], from + ' says: ' + text);
    }
  } else {
    for (admin in admins) {
      bot.say(admins[admin], from + ' needs an adult');
    }
  }
};
