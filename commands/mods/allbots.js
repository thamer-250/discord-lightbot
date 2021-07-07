const { MessageEmbed } = require("discord.js");
const Database = require('st.db')
const st = new Database(`lightbot`)
module.exports = {
  name: "allbots",
  aliases: ["bots"],
  description: "show all bots",
   async execute(client, message, args){
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
   
if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**Required permissions** \nADMINISTRATOR`)
      .setColor("#ff0000")
      )
    const botssize = message.guild.members.cache.filter(m=>m.user.bot).map(m=> `<@${m.user.id}>`);
    const x = new MessageEmbed()
    .setTitle(`Total Bots : ${message.guild.members.cache.filter(member => member.user.bot).size}`)
    .setColor('#0x2F3136')
    .setDescription(`${botssize.join('\n')}`)
    message.channel.send(x)
  }
}