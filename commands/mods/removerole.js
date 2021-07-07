const { MessageEmbed } = require('discord.js')
const Database = require('st.db')
const st = new Database(`lightbot`)
module.exports = {
  name: "removerole",
  aliases: ["remove-role"],
  description: "Remove a role for a user",
  usage: "<user> <role>",
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
        

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!rMember) return message.channel.send("**> :x: - please mention member**");
  
    
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
    
    if(!role) return message.channel.send(`**> :x: - please mention role**`)
    
    
    
     
      await message.channel.send(`**> Change Roles For ${rMember}** \`-${role.name}\``)
      
      rMember.roles.remove(role)
    
  }
}