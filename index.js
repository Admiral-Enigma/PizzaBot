let DiscordClient = require('discord.io');
let fs = require('fs');
let request = require('request');
require('dotenv').config()
var i = 0

var bot = new DiscordClient({
    autorun: true,
    token: process.env.discordApiKey
});

var cmds = ["!fuckdig", "!ping","!help","!cats","!heman"];
var m8ball = ["It is certain","It is decidedly so", "Without a doubt" , "Yes, definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now" , "Cannot predict now" , "Concentrate and ask again", "Don't count on it","My reply is no","My sources say no", "Outlook not so good"];

bot.on('ready', function() {
    console.log(bot.username + " - (" + bot.id + ")");
    console.log("My body is ready! DemSquirrel <3");
    bot.setPresence({
        idle_since: null,
        game: "Hacking the NSA"
    })
});

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    i++;
  });
};

bot.on('message', function(user, userID, channelID, message, rawEvent) {
    console.log("Channel "+channelID+" User: "+user+" Id: "+userID+" Message: "+message);

    if (message === "!ping" & user != "PizzaBOT") {
        bot.sendMessage({
            to: channelID,
            message: "pong"
        });
    }else if (message === "!fuckdig" & user != "PizzaBOT") {
          bot.sendMessage({
              to: channelID,
              message: "Fuck dig jeg kommer og chopper dig "+user
          });
    }else if (message === "!help" & user != "PizzaBOT") {
        bot.sendMessage({
          to: channelID,
          message: "Whalla her er mine commands"
        });
        for (var i = 0; i < cmds.length; i++) {
          bot.sendMessage({
            to: channelID,
            message: cmds[i]
          });
        }
    }else if (message === "!cats" & user != "PizzaBOT") {
      download('http://thecatapi.com/api/images/get?format=src&type=gif', 'cats/cat'+i+'.gif', function(){
        bot.uploadFile({
          to: channelID,
          file: 'cats/catundefined.gif',
          filename: "cuteCat"+i+".gif",
          message: "Cats :3"
        });
      });

    }else if (message === "!heman") {
      bot.sendMessage({
        to: channelID,
        message: "https://www.youtube.com/watch?v=eh7lp9umG2I"
      });

    }else if (message === "!diggyhole") {
      bot.sendMessage({
        to: channelID,
        message: "https://www.youtube.com/watch?v=fR7EAdPUqvQ"
      });

    }else if (message === "!rick" || message === "!roll") {
      bot.sendMessage({
        to: channelID,
        message: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      });

    }else if (message ==="!wasabi") {

      bot.sendMessage({
        to: channelID,
        message: "https://www.youtube.com/watch?v=kbz1ZTc9l7U"
      });
    }else if (message.substring(0,6) === "!8ball") {
      var anwser = Math.floor((Math.random() * m8ball.length) + 1);
      bot.sendMessage({
        to: channelID,
        message: m8ball[anwser]+" "+user
      });
    }
});
