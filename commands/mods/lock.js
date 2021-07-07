const Discord = require("discord.js")
const Database = require('st.db')
const st = new Database(`lightbot`)
module.exports = {
  name: 'lock',
  aliases: ["اقفل"],
  description: "Disable @everyone from sending messages in specific channel",
  usage: "<channel>",
  async execute(client, message, args){
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
    
    if(!message.member.hasPermission("MANAGE_CHANNELS")){
  return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**Required permissions** \nMANAGE_CHANNELS`)
      .setColor("#ff0000")
      )
}
if (!message.guild.me.hasPermission("MANAGE_CHANNELS", "EMBED_LINKS"))
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**i Need permissions** \nMANAGE_CHANNELS , EMBED_LINKS`)
      .setColor("#ff0000")
      )

      let channel = message.mentions.channels.first();
if (channel) {
     
    } else {
      channel = message.channel;
    }
  let lockReason = args.join(" ").slice(22);
    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false,
    });
    let embed = new Discord.MessageEmbed()
    //.setTitle('**successfully ✅**')
    .setDescription(`**> Successfully locked ${channel} \n > Reason: ${lockReason || "none"}**`)
    .setColor("#00ff59")
    message.channel.send(embed)
  }
}