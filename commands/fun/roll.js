const Discord = require('discord.js');

const Database = require('st.db')
const st = new Database(`lightbot`)
module.exports = {
    name: "roll",
    aliases: ["dice"],
    description: "Rolling dice",
    async execute(client, message, args){
     
    let limit = args[0];
    if (!limit) limit = 6;

    const result = Math.floor(Math.random() * limit + 1);


     message.channel.send(result);
    }
}