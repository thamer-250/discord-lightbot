const Discord = require("discord.js")
const moment = require('moment');
const Database = require('st.db')
const st = new Database(`lightbot`)
const co = new Set();
module.exports = {
  name: "channelinfo",
  aliases: ["channel"],
  description: "Get information on a channel",
  usage: "<channel>",
  async execute(client, message, args){
     let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
  
    if (co.has(message.author.id)) {
            message.channel.send(`**> ${message.author.username}**, Cool down (**5 seconds** left)`).then((msg) => {
    setTimeout(function() {
    msg.delete();
  }, 5000)});
    } else {

      let ch = message.mentions.channels.first();
      if (ch) {
           
          } else {
            ch = message.channel;
          }
    const totalUsers = ch.members.size;
        const bots = ch.members.array().filter(b => b.user.bot).length;
        const humans = ch.members.size - bots;
        
        const NFSW = {
            true: 'Yes',
            false: 'No'
        }
    let embed = new Discord.MessageEmbed()
      .setDescription(`**Name:** \`${ch.name}\` \n**Type:** \`${ch.type}\` \n**Topic:** \`${ch.topic || "none"}\` \n**Users:** \`${totalUsers}\` \n**Bots:** \`${bots}\` \n**Humans:** \`${humans}\` \n**NFSW:** \`${NFSW[ch.nsfw]}\` \n**CreatedAt:** \`${moment(ch.createdAt).format('DD/MMM/YYYY')}\``)
      .setColor("#002746")
      message.channel.send(embed)
        co.add(message.author.id);
        setTimeout(() => {
          co.delete(message.author.id);
        }, 5000);
    }
   
  }
}