//Grabs images from 4chan threads

var directory = "/tmp/rips/"

exec("mkdir -p " + directory);

function get_images(link, thread) {
  exec("mkdir " + directory + thread + "; wget -e robots=off -E -nd -N -np -r -k -H -P " + directory + thread + " -D i.4cdn.org -R html " + link + " -o /dev/null --no-check-certificate");
}

function get_thread(link, thread) {
  exec("mkdir " + directory + thread + "; wget -e robots=off -E -nd -N -np -r -k -H -P " + directory + thread + " -D i.4cdn.org,t.4cdn.org " + link + " -o /dev/null --no-check-certificate");
}

bot.modules.rip = function(from, to, text, message) {
  var commands = text.split(' ');
  var args = '',
      link = '';
  for (var i = 0; i < commands.length; i++) {
    if (commands[i].substr(0, 1) == '-') {
      args += commands[i].slice(1);
    }
    if (commands[i].search(/https?:\/\/boards.4chan.org.*/) != -1) {
      link = commands[i].match(/http\S*/)[0];
    }
  }
  if(link) {
    var board = link.match(/[a-z]*\/thread/)[0].match(/^[a-z]*/)[0],
        thread = link.match(/thread\/[0-9]*/)[0].match(/[0-9][0-9]*/)[0];
    if (args.indexOf('a') != -1) {
      get_thread(link, board + '-' + thread);
      bot.speak("Downloading entire thread to " + directory + board + "-" + thread );
    } else {
      get_images(link, board + '-' + thread);
      bot.speak("Downloading images to " + directory + board + "-" + thread );
    }
  } else {
    bot.speak("Cannot parse link");
  }
};

bot.addListener("pm", function(from, text, message) {
  var commands = text.split(' ');
  if(commands[0] == ".rip") {
    var args = '',
        link = '';
    for (var i = 0; i < commands.length; i++) {
      if (commands[i].substr(0, 1) == '-') {
        args += commands[i].slice(1);
      }
      if (commands[i].search(/https?:\/\/boards.4chan.org.*/) != -1) {
        link = commands[i].match(/http\S*/)[0];
      }
    }
    if(link) {
      var board = link.match(/[a-z]*\/res/)[0].match(/^[a-z]*/)[0],
          thread = link.match(/res\/[0-9]*/)[0].match(/[0-9][0-9]*/)[0];
      if (args.indexOf('a') != -1) {
        get_thread(link, board + '-' + thread);
        bot.bot.speak(from, "Downloading entire thread to " + directory + board + "-" + thread );
      } else {
        get_images(link, board + '-' + thread);
        bot.bot.speak(from, "Downloading images to " + directory + board + "-" + thread );
      }
    } else {
      bot.bot.speak(from, "Cannot parse link");
    }
  }
});
