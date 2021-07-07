const Discord = require('discord.js')
const Database = require('st.db')
const st = new Database(`lightbot`)

module.exports = {
  name: 'kick',
  aliases: ["طرد"],
  description: "Kicks a member",
  usage: "<user>",
  async execute(client, message, args){
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
    
 if(!message.member.hasPermission("KICK_MEMBERS")){
  return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**Required permissions** \nKICK_MEMBERS`)
      .setColor("#ff0000")
      )
}
if (!message.guild.me.hasPermission("KICK_MEMBERS", "EMBED_LINKS"))
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**i Need permissions** \nKICK_MEMBERS`)
      .setColor("#ff0000")
      )
       const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if(!member) return message.channel.send("**> :x: - please mention member**")
      if (member.id === message.author.id)return message.channel.send(`**> :x: - You can't kick yourself**`)
    const reason = args.slice(2).join(" ");
      if (!message.guild.member(member).kickable)
      return message.channel.send("**:> x: - You cannot kick a the member**");
      if (member.id === message.author.id)return message.channel.send(`**You can't kick yourself**`)
        message.guild.member(member).kick();
        message.channel.send(`**> ✅ @${member.user.username} kicked from the server**`)
  }
}
