const Discord = require("discord.js")
const Database = require('st.db')
const st = new Database(`lightbot`)
const co = new Set();
module.exports = {
  name: "invite",
  aliases: ["inv"],
  description: "Get link invite bot",
  async execute(client, message, args){
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
   

    if (co.has(message.author.id)) {
            message.channel.send(`**> ${message.author.username}**, Cool down (**5 seconds** left)`).then((msg) => {
    setTimeout(function() {
    msg.delete();
  }, 5000)});
    } else {
 let embed = new Discord.MessageEmbed()
    .setDescription(`**> Invite: [here](https://discord.com/api/oauth2/authorize?client_id=832186465647591454&permissions=1073794167&scope=bot)** \n**> Support: [here](https://discord.gg/cTcatCdqUd)** \n**> Vote: [here](https://top.gg/bot/832186465647591454/vote)**`)
    .setColor("#7289da")
    .setFooter(client.user.username, client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
    message.channel.send(embed)

        co.add(message.author.id);
        setTimeout(() => {
          co.delete(message.author.id);
        }, 5000);
    }
   
  }
}