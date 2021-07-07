const Discord = require("discord.js")

const Database = require('st.db')
const st = new Database(`lightbot`)
module.exports = {
    name: "google",
    description: "Searches in google for result",
    usage: "<anything>",
    async execute(client, message, args){
      
        let dd = args.join("+")
        let ss = args.join(" ")

        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Google Search`)
        .setDescription(`[${ss}](https://www.google.com/search?q=${dd})`)
        .setColor("#a9a9ff")
        )
    }
}