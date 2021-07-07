const Discord = require('discord.js')
const Database = require('st.db')
const st = new Database(`lightbot`)

module.exports = {
  name: 'mute',
  aliases: ["اسكت"],
  description: "Mute a member from text channels so they cannot type",
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
     if (member.id === message.author.id)return message.channel.send(`**> :x: - You can't mute yourself**`)
      let mutedrole = message.guild.roles.cache.find(ro => ro.name === 'Muted')
        if(!mutedrole) return message.channel.send('**> 🙄 - I can not find `Muted` Role so please create one**')

         member.roles.add(mutedrole)
        message.channel.send(`**> :white_check_mark: @${member.user.username} muted from the text! :zipper_mouth:**`)

       
      
       
  }
}
