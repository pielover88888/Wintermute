bot.modules.wfw = function(from, to, text, mes) {
    if(from == dbladez) {
	return;
    }
    bot.speak("http://wiki.wetfish.net/" + text);
}