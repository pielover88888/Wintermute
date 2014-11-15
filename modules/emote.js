bot.modules.dunno = function(from, to, text, message) {
  var c = require('irc-colors');
  var faces = [
    "‾\\(ツ)/‾",
    "¯\\(º_o)/¯",
    "¯\\_(シ)_/¯"
  ];

  bot.speak2(to, c.lime(faces[Math.floor(Math.random() * faces.length)]));
};

bot.modules.downy = function(from, to, text, message) {
  var c = require('irc-colors');
  var downy = ".'\x1f/\x1f)";
  bot.speak2(to, c.lime(downy));
};

bot.modules.lv = function(from, to, text, message) {
  var c = require('irc-colors');
  var lv = "♥";
  bot.speak2(to, c.red(lv));
};

bot.modules.id = function(from, to, text, message) {
  var c = require('irc-colors');
  var x = ~~(Math.random() * 4) + 0;
  var y = ~~(Math.random() * 999) + 0;

  if (y >= 800) {
    var dbladez = [
      '\x03\x02illegal dbladez\x02',
      '\x03\x02I snuck dbladez into prison up my ass.\x02',
      '\x03\x02I love sniffing whole lines of dbladez.\x02',
      '\x03\x02Twenty-five years in prison was worth it for just one hit of dbladez\x02',
      '\x03\x02Taking dbladez ruined my life.\x02'
    ];
    bot.speak2(to, dbladez[x]);
  } else {
    bot.speak2(to, "\x03\x02illegal drugs\x02");
  }
};

bot.modules.ld = function(from, to, text, message) {
  var c = require('irc-colors');
  var x = ~~(Math.random() * 29) + 0;

  if (x == 9) {
    bot.speak2(to, "\x03\x02There are no legal drugs.\x02");
  } else if (x == 19) {
    bot.speak2(to, "\x03\x02All drugs are illegal.\x02");
  } else if (x == 29) {
    bot.speak2(to, "\x03\x02Your drug use has been logged and reported.\x02");
  } else {
    bot.speak2(to, "\x03\x02legal drugs\x02");
  }
};

bot.modules.line.xD = function(from, to, text, message) {
  var c = require('irc-colors');
  if (text == "xD") {
    var x = ~~(Math.random() * 4) + 0;
    var y = ~~(Math.random() * 99) + 0;

    if (y == 99) {
      bot.speak2(to, "hi every1 im new!!!!!!! holds up spork my name is katy but u can call me t3h PeNgU1N oF d00m!!!!!!!! lol…as u can see im very random!!!! thats why i came here, 2 meet random ppl like me _… im 13 years old (im mature 4 my age tho!!) i like 2 watch invader zim w/ my girlfreind (im bi if u dont like it deal w/it) its our favorite tv show!!! bcuz its SOOOO random!!!! shes random 2 of course but i want 2 meet more random ppl =) like they say the more the merrier!!!! lol…neways i hope 2 make alot of freinds here so give me lots of commentses!!!! DOOOOOMMMM!!!!!!!!!!!!!!!! <--- me bein random again _^ hehe…toodles!!!!!");
      bot.speak2(to, "loves and waffles,");
      bot.speak2(to, "t3h PeNgU1N oF d00m");
    } else {
      if (y < 49) {
        var xd = ['xd', 'xD', 'XD', 'xDD', 'XDD'];
        bot.speak2(to, xd[x]);
      }
    }
  }
};
