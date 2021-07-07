const Database = require('st.db')
const st = new Database(`lightbot`)
module.exports = {
  name: "set-welcome",
  aliases: ["setwelcome"],
  description: "Set the welcome channel",
  usage: "<channel>",
  async execute(client, message, args){

 let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`:x: - you are blacklisted`)
    let settings = st.fetch(`settings_${message.guild.id}`)
    if(settings === 1) return;
if(!message.member.hasPermission("MANAGE_CHANNELS"))
  return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**Required permissions** \nMANAGE_CHANNELS`)
      .setColor("#ff0000")
      )

    const chh = message.mentions.channels.first()
    if(!chh) return;

    message.channel.send(`**✅ - The channel has been set to : ${chh}**`)
    st.set(`wel_${message.guild.id}`, chh.id)
    let ch = "837073573121884162"
    client.channels.cache.get(ch).send(new Discord.MessageEmbed()
    .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true, size: 1024 }))
    .setTitle("add autoembed")
    .addField("Server", `\`${message.guild.name} (ID: ${message.guild.id})\``)
    .addField("Channel", `\`${chh.name} (ID: ${chh.id})\``)
    .addField("By", `<@${message.author.id}> \`(ID: ${message.author.id})\``)
    )
  }
}