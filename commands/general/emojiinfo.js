const Discord = require('discord.js')
const moment = require('moment')
const Database = require('st.db')
const st = new Database(`lightbot`)
const { parse } = require("twemoji-parser");

module.exports = {
    name: "emojiinfo",
    aliases: ["emoji"],
    description: "Get information on a emoji",
    usage: "<emoji>",
    async execute(client, message, args) {
      let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
   
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**i Need permissions** \nEMBED_LINKS`)
      )
          const emoji = args[0];
    if (!emoji) return message.channel.send("**> :x: - No emoji provided!**");

    let custom = Discord.Util.parseEmoji(emoji);
    const embed = new Discord.MessageEmbed()
    .setColor("#0x2F3136");
    embed.setDescription(`[**LINK**](https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"})`)

    if (custom.id) {
        embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
        return message.channel.send(embed);
    }
    else {
        let parsed = parse(emoji, { assetType: "png" });
        if (!parsed[0]) return message.channel.send("**> :x: - Invalid emoji!**");

        embed.setImage(parsed[0].url);
        return message.channel.send(embed);
    

}
    }
}