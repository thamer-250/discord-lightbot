const Discord = require("discord.js")

const Database = require('st.db')
const st = new Database(`lightbot`)
module.exports = {
  name: 'delete-autorole',
  aliases: ["deleteautorole"],
  description: "Removeing autorole",
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
 
    
  
   
    message.channel.send("**:thinking: Are you sure you want to reset autorole?**").then(msg => {
    msg.react("✅")
    msg.react("❌")
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))
let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 15000, max: 1 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 15000, max: 1 });
reaction1.on("collect", r => {
msg.edit('**✅ - autorole removed**')
st.delete(`autorole_${message.guild.id}`)
let ch = "837073573121884162"
client.channels.cache.get(ch).send(new Discord.MessageEmbed()
.setThumbnail(message.guild.iconURL({ format: "png", dynamic: true, size: 1024 }))
.setTitle("delete autoroles")
.addField("Server", `\`${message.guild.name} (ID: ${message.guild.id})\``)
.addField("By", `<@${message.author.id}> \`(ID: ${message.author.id})\``)
)
msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
})
reaction2.on("collect", r => {
   msg.delete()
})
    })
    
  }
}
 