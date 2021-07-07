const Discord = require("discord.js")
const Database = require('st.db')
const st = new Database(`lightbot`)
module.exports = {
  name: 'set-autorole',
  aliases: ["setautorole"],
  description: "Adding auto role",
  usage: "<role>",
  async execute(client, message, args){
 

      let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`:x: - you are blacklisted`)
   
      if(!message.member.hasPermission("ADMINISTRATOR")){
  return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**Required permissions** \nADMINISTRATOR`)
      .setColor("#ff0000")
      )
}
if (!message.guild.me.hasPermission("MANAGE_ROLES", "EMBED_LINKS"))
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**i Need permissions** \nMANAGE_ROLES`)
      .setColor("#ff0000")
      )
 
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!role) return message.channel.send(`**:x: - please mention role!**`)
  
    st.set(`autorole_${message.guild.id}`, role.id), message.channel.send(`I will give new members: \`${role.name} (ID: ${role.id})\``)
    let ch = "837073573121884162"
    client.channels.cache.get(ch).send(new Discord.MessageEmbed()
    .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true, size: 1024 }))
    .setTitle("add autoroles")
    .addField("Server", `\`${message.guild.name} (ID: ${message.guild.id})\``)
    .addField("Role", `\`${role.name} (ID: ${role.id})\``)
    .addField("By", `<@${message.author.id}> \`(ID: ${message.author.id})\``)
    )
  }
}
 