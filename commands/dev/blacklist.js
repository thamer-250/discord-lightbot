const Discord = require("discord.js")
const Database = require('st.db')
const st = new Database(`lightbot`)

module.exports = {
  name: "blacklist",
  async execute(client, message, args){
     let array = ["704595375197126758", "601871597728694302"]
  
  if(!array.includes(message.author.id.toString())) {
    return message.channel.send("Only people who are worthy enough can use it")
  }
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send(`**Please specify a user**`)
    const reason = args.slice(1).join(" ")
    if(!member.user.id === client.user.id) return;
    let thamer = "704595375197126758"
    if(!member.user.id === thamer) return;
    let blacklisted = st.fetch(`blacklist_${member.id}`)
    if(blacklisted === 1) return message.channel.send(`${member} is already blacklisted`)

    message.channel.send(`${member} has been blacklisted`)
    st.set(`blacklist_${member.id}`, 1, reason)
    let chh = "835540119955177513"
    let embed2 = new Discord.MessageEmbed()
    .setTitle("Blacklist")
    .setThumbnail('https://images-ext-2.discordapp.net/external/yR9O-fIoMKRGvN0jOkaV7_8O4meYodsUY2UcZyo1ZHY/%3Fwidth%3D427%26height%3D427/https/media.discordapp.net/attachments/827271497713188956/827271524523573308/image0.png')
    .addField("User", `${member} \`(ID: ${member.id})\``, true)
    .addField("By", `<@${message.author.id}>`,true)
    .addField("Channel", `${message.channel.name}`, true)
    .addField("Reason", `${reason}`, true)
    .setColor("#ff0000")
    client.channels.cache.get(chh).send(embed2)
  }
}