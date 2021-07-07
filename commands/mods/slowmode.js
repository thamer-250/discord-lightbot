const Discord = require('discord.js')
const Database = require('st.db')
const st = new Database(`lightbot`)
const ms = require("ms");;

module.exports = {
  name: "slowmode",
  aliases: ["slow"],
  description: "Update or disable the slowmode for the channel",
  usage: "<number/s/m/h>",
  async execute(client, message, args){
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
 
    const amount = parseInt(args[0]);
    if(!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send(new Discord.MessageEmbed()
        .setTitle('**❌ Error**')
        .setDescription(`**Required permissions** \nMANAGE_CHANNELS`)
        .setColor("#ff0000")
        )
      
      if (isNaN(amount))
        return message.channel.send("**> :x: - It doesn't seem to be valid number**");
    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        message.channel.send(`**> ✅ - Successfully set the slowmode to **\`${amount}s\``);
        return;
      } else {
        message.channel.send(`**> ✅ - Successfully set the slowmode to **\`${amount}s\``);
        return;
      }
    }
    if (args[0] === amount + "m") {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        message.channel.send(`**> ✅ - Successfully set the slowmode to **\`${amount}m\``);
        return;
      } else {
        message.channel.send(`**> ✅ - Successfully set the slowmode to **\`${amount}m\``);

        return;
      }
    }
    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        message.channel.send(`**> ✅ - Successfully set the slowmode to **\`${amount}h\``);
        return;
      } else {
        message.channel.send(`**> ✅ - Successfully set the slowmode to **\`${amount}h\``);
        return;
      }
    } else {
      message.channel.send(
        "**> :x: - You can only set seconds(s), minutes(m) and hours(h)**"
      );
    }
  }
};