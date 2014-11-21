bot.modules.unload = function(from, to, text, message) {
  if (from === bot.config.master) {
    var to_unload = text.split(' ');
    try {
      for (i in to_unload) {
        bot.unload_module(to_unload[i]);
      }
	bot.speak2(to, '\u000303Unloaded module' + ((text.split(' ').length>1)?'s':'') + ' \u000f[\u000310' + text.replace(/ /g, ', ') + '\u000f]')
    } catch(err) {
      console.log('Error unloading module [' + text + ']')
	bot.speak2(to, '\u000304Error unloading module \u000f[\u000310' + text + '\u000f]')
    }
  }
}

bot.modules.load = function(from, to, text, message) {
  if (from === bot.config.master) {
    var to_load = text.split(' ');
    try {
      for (i in to_load) {
        bot.load_module(to_load[i]);
      }
	bot.speak2(to, '\u000303Loaded module' + ((text.split(' ').length>1)?'s':'') + ' \u000f[\u000310' + text.replace(/ /g, ', ') + '\u000f]')
    } catch(err) {
      console.log('Error loading module [' + text + ']')
	bot.speak2(to, '\u000304Error loading module \u000f[\u000310' + text + '\u000f]')
    }
  }
}

bot.modules.reload = bot.modules.load
