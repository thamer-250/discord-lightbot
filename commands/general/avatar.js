const Discord = require("discord.js")

const Database = require('st.db')
const st = new Database(`lightbot`)
const co = new Set();
module.exports = {
  name: 'avatar',
  aliases: ["av"],
  description: "View your ,or someone Avatar",
  usage: "<user/id>",
  async execute(client, message, args){
    
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
  
       if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      
      .setDescription(`**i Need permissions** \nEMBED_LINKS`)
      )
      if (co.has(message.author.id)) {
            message.channel.send(`**> ${message.author.username}**, Cool down (**5 seconds** left)`).then((msg) => {
    setTimeout(function() {
    msg.delete();
  }, 5000)});
    } else {

      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member; 
     let embed = new Discord.MessageEmbed()
     .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
    .setColor(member.displayHexColor)
      .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      message.channel.send(embed)
        co.add(message.author.id);
        setTimeout(() => {
          co.delete(message.author.id);
        }, 5000);
    }
   
    
     
  }
}