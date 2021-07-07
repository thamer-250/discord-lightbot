const Discord = require("discord.js")
const Database = require('st.db')
const st = new Database(`lightbot`)
const co = new Set();
module.exports = {
  name: "serverinfo",
  aliases: ["server"],
  description: "Get information on a server",
  async execute(client, message, args){
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
  
    if (co.has(message.author.id)) {
            message.channel.send(`**> ${message.author.username}**, Cool down (**5 seconds** left)`).then((msg) => {
    setTimeout(function() {
    msg.delete();
  }, 5000)});
    } else {
let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name}'s server info`, message.guild.iconURL({ format: "png", dynamic: true, size: 1024 }))
    .setColor("#1d5f9a")
    .addField("Server name", `\`${message.guild.name}\``, true)
    .addField("Owner", `${message.guild.owner}`, true)
    .addField("Server Region", `\`${message.guild.region}\``, true)
    .addField("Members", `\`${message.guild.memberCount}\``, true)
    .addField("Verification", `\`${message.guild.verificationLevel}\``, true)
    .addField("Roles", `\`${message.guild.roles.cache.size}\``, true)
    .addField("Boosts", `${message.guild.premiumSubscriptionCount}/30`, true)
    .setImage(message.guild.bannerURL({ format: "png", dynamic: false, size: 1024 }))
    message.channel.send(embed).catch(err => {
      message.channel.send(err)
    })

        co.add(message.author.id);
        setTimeout(() => {
          co.delete(message.author.id);
        }, 5000);
    }
    
    
  }
}