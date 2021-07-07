const Discord = require("discord.js");
require('discord-inline-replys')
const Database = require('st.db')
const st = new Database(`lightbot`)
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '<command name>',
	execute(client, message, args) {
    let embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
    .setColor('#7289da')
    .addField("General [10]", `\`avatar\`, \`botinfo\`, \`channelinfo\`, \`emojiinfo\`, \`invite\`, \`ping\`, \`serverinfo\`, \`translate\`, \`userinfo\`, \`bug\``)
    .addField("Admins [14]", `\`clear\`, \`kick\`, \`ban\`, \`lock\`, \`mute\`, \`send\`, \`slowmode\`, \`unban\`, \`unlock\`, \`unmute\`, \`vote\`, \`allbots\`, \`addrole\`, \`removerole\``)
    .addField("Fun [3]", `\`8ball\`, \`meme\`, \`roll\``)
    .addField("Settings [9]", `\`set-welcome\`, \`set-autorole\`, \`delete-autorole\`, \`set-boost\`, \`autorole-info\`, \`set-autoembed\`, \`info\`, \`disable\`, \`enable\``)
    .addField("Suggestions [2]", `\`set-suggestion\`, \`suggest\``)
   
 message.channel.send(embed)
	}
}
