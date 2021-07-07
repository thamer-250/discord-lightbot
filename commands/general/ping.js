const Discord = require("discord.js")
const Database = require('st.db')
const st = new Database(`lightbot`)
const co = new Set()

module.exports = {
  name: "ping",
  
  async execute(client, message, args){
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
    
    
if (co.has(message.author.id)) {
            message.channel.send(`**> ${message.author.username}**, Cool down (**5 seconds** left)`).then((msg) => {
    setTimeout(function() {
    msg.delete();
  }, 5000)});
    } else {

const ping = Date.now() - message.createdTimestamp
let embed = new Discord.MessageEmbed()
.setDescription(`> Bot latency: ${ping} \n> API latency: ${client.ws.ping}`)
message.channel.send(embed)



        co.add(message.author.id);
        setTimeout(() => {
          co.delete(message.author.id);
        }, 5000);
    }
   
    /*const ping = Date.now() - message.createdTimestamp
    let embed = new Discord.MessageEmbed()
    .setDescription(`Bot latency: ${ping}ms \nAPI Latency: ${client.ws.ping}ms`)
    message.channel.send(embed)*/
  }
}