const Discord = require("discord.js")
const dfun  = require("discord-spanish-fun");
const Database = require('st.db')
const st = new Database(`lightbot`)
module.exports = {
  name: "meme",
  description: "Sends a meme",
  async execute(client, message, args){
   
    let data = await dfun.meme()
    let embed = new Discord.MessageEmbed()
    .setImage(data)
    message.channel.send(embed)
  }
}