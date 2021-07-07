const Discord = require("discord.js")
const Database = require('st.db')
const st = new Database(`lightbot`)
const {
    version
} = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")
const co = new Set();
module.exports = {
  name: "botinfo",
  aliases: ["bot"],
  description: "Get information on a bot",
  usage: "",
  async execute(client, message, args){
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
  
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**i Need permissions** \nEMBED_LINKS`)
      )
      if (co.has(message.author.id)) {
            message.channel.send(`**> ${message.author.username}**, Cool down (**5 seconds** left)`).then((msg) => {
    setTimeout(function() {
    msg.delete();
  }, 5000)});
    } else {

const botinfo = new Discord.MessageEmbed()
                .setAuthor(message.client.user.username)
               // .setTitle("__**Stats:**__")
                .setColor("RANDOM")
                .addField("Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
                .setColor("#7289da")
                .addField("Users", `${message.client.users.cache.size}`, true)
                .addField("Servers", `${message.client.guilds.cache.size}`, true)
                .addField("Channels ", `${message.client.channels.cache.size}`, true)
                .addField("Discord.js", `v${version}`, true)
                .addField("Node", `${process.version}`, true)
                
         message.channel.send(botinfo)
        co.add(message.author.id);
        setTimeout(() => {
          co.delete(message.author.id);
        }, 5000);
    }
     
  }
}