GLOBAL.irc = require("irc")
GLOBAL.request = require("request")
GLOBAL.http = require("http")
GLOBAL.https = require("https")
GLOBAL.exec = require("child_process").exec
GLOBAL.fs = require('fs')

var config = {
    botName: 'Wintermute',
    channel: '#wetfish',
    testingChannel: '#testing',
    channels: ['#wetfish', '#testing'],
    commandChar: '.',
    master: 'Weazzy',
    moduleDir: './modules/',
    server: 'irc.wetfish.net'
}

GLOBAL.bot = new irc.Client(config.server, config.botName, 
			    {
				channels: config.channels, 
				userName: config.botName, 
				realName: config.botName, 
				secure: true,
				selfSigned: true,
				port: 6697
			    })

bot.config = config
bot.modules = {}
bot.modules.line = {}
bot.last = []
bot.speak = function(text) {
  bot.say(config.channel, text.slice(0,512));
}
bot.speak_test = function(text) {
  bot.say(testingChannel, text.slice(0,512));
}

bot.unload_module = function(module) {
  var mod_path = bot.config.moduleDir + module + '.js';
  if (require.cache[require.resolve(mod_path)]) delete require.cache[require.resolve(mod_path)];
  if (bot.modules[module]) delete bot.modules[module];
  if (bot.modules.line[module]) delete bot.modules.line[module];
}

bot.load_module = function(module) {
  bot.unload_module(module)
  require(bot.config.moduleDir + module + '.js');
}

fs.readdir(bot.config.moduleDir, function (err, files) {
  for(var i = 0; i < files.length; ++i) {
    require(bot.config.moduleDir + files[i]);
  }
});

bot.check_database = function(subdb) {
  fs.exists('./db', function(exists) {
    if (!exists) {
      try {
        fs.mkdir('./db', '0700');
      } catch(e) {
        console.log("### DATABASE ERROR ###\n" + e);
      }
    }
  });
  fs.exists('./db/' + subdb, function(exists) {
    if (!exists) {
      try {
        fs.writeFile('./db/' + subdb, '[]');
      } catch(e) {
        console.log("### DATABASE ERROR ###\n" + e);
      }
    }
  });
}

bot.addListener("message", function(from, to, text, message) {
  for (i in bot.modules.line) {
    bot.modules.line[i](from, to, text, message)
  }
  if (text.slice(0, config.commandChar.length) === config.commandChar) {
    var command = text.slice(config.commandChar.length).split(' ')[0];
    text = text.slice(config.commandChar.length).split(' ').slice(1).join(' ')
    if (bot.modules[command]) bot.modules[command](from, to, text, message);
  }
  if (to == config.channel) {
    if (bot.last.unshift({from:from, text:text}) > 100) bot.last.pop()
  }
});

bot.addListener("error", function(message) {
  console.log("### IRC ERROR ###");
  console.log(message);
});
process.on('uncaughtException', function(err) {
  console.log("### GLOBAL ERROR ###");
  console.log(err);
});
