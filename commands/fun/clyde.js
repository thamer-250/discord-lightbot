const Discord = require("discord.js")
const Database = require('st.db')
const st = new Database(`lightbot`)

module.exports = {
    name: "clyde",
    async execute(client, message, args){
        let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`:x: - you are blacklisted`)
   
        if(!args[0]) return;

        message.channel.send(new Discord.MessageEmbed()
        .setImage(`https://ctk-api.herokuapp.com/clyde/${args[0]}`)
        .setColor("#a9a9ff"))
    }
}