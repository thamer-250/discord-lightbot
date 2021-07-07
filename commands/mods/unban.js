const Discord = require("discord.js")
const Database = require('st.db')
const st = new Database(`lightbot`)

module.exports = {
  name: "unban",
  description: "Unban a member",
  usage: "<id>",
  async execute(client, message, args){
      let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
    
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**Required permissions** \nBAN_MEMBERS`)
      .setColor("#ff0000")
      )
      if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**i Need permissions** \BAN_MEMBERS`)
      .setColor("#ff0000")

      )
     
    let bannedMember = await client.users.fetch(args[0])       //I believe the error is somewhere in this line maybe because of the promise
    if(!bannedMember) return message.channel.send("**:x: - Please enter the user id!**")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "none"


    try {
        message.guild.members.unban(bannedMember, {reason: reason})
        message.channel.send(`**> ✅ ${bannedMember.tag} unbanned!**`)
    } catch(e) {
        console.log(e.message)
    }
  }
}