const Discord = require('discord.js')
const Database = require('st.db')
const st = new Database(`lightbot`)

module.exports = {
  name: 'unmute',
  aliases: ["تكلم"],
  description: "Unmutes a membe",
  usage: "<user>",
  async execute(client, message, args){
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
   
      if(!message.member.hasPermission("MANAGE_ROLES")){
  return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**Required permissions** \nMANAGE_ROLES`)
      .setColor("#ff0000")
      )
}
if (!message.guild.me.hasPermission("MANAGE_ROLES", "EMBED_LINKS"))
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**i Need permissions** \nMANAGE_ROLES`)
      .setColor("#ff0000")
      )

    const member = message.mentions.members.first()
    if(!member) return message.channel.send(`**> :x: - please mention member**`)
     
      let mutedrole = message.guild.roles.cache.find(ro => ro.name === 'Muted')
        if(!member.roles.cache.has(mutedrole.id))return message.channel.send(`**> ${member.user.username} is not muted**`)
        await member.roles.remove(mutedrole);
       

         
        message.channel.send(`**> :white_check_mark: @${member.user.username} unmuted!**`)

       
      
       
  }
}
