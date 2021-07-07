const Discord = require("discord.js")
const Database = require('st.db')
const st = new Database(`lightbot`)

module.exports = {
  name: "set-boost",
  aliases: ["setboost"],
  async execute(client, message, args){

 let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`:x: - you are blacklisted`)
   
if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**Required permissions** \nADMINISTRATOR`)
      .setColor("#ff0000")
      )

    const bch = message.mentions.channels.first()
    if(!bch) return;

    message.channel.send(`**✅ - The channel has been set to : ${bch}**`)
    st.set(`boost_${message.guild.id}`, bch.id)
    let ch = "837073573121884162"
    client.channels.cache.get(ch).send(new Discord.MessageEmbed()
    .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true, size: 1024 }))
    .setTitle("add autoboost")
    .addField("Server", `\`${message.guild.name} (ID: ${message.guild.id})\``)
    .addField("Channel", `\`${bch.name} (ID: ${bch.id})\``)
    .addField("By", `<@${message.author.id}> \`(ID: ${message.author.id})\``)
    )
  }
}