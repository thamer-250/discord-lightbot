const Discord = require('discord.js')
const Database = require('st.db')
const st = new Database(`lightbot`)

module.exports = {
  name: 'ban',
  aliases: ["حظر"],
  description: "Bans a member",
  usage: "<user>",
  async execute(client, message, args){
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
   
 if(!message.member.hasPermission("BAN_MEMBERS")){
  return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**Required permissions** \nBAN_MEMBERS`)
      .setColor("#ff0000")
      )
}
if (!message.guild.me.hasPermission("BAN_MEMBERS", "EMBED_LINKS"))
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**i Need permissions** \nBAN_MEMBERS`)
      .setColor("#ff0000")
      )
       const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!member) return message.channel.send("**> :x: - please mention member**")
      if(!member.bannable) return message.channel.send('**> This user can\'t be banned.**');
      if (member.id === message.author.id)return message.channel.send(`**> You can't ban yourself**`)
    let reason = args.slice(2).join(" ");
    if (member) {
      member.ban({reason: reason,})
      message.channel.send(`**> ✅ @${member.user.username} banned from the server!✈**`)
    } 
    
      
  }
}