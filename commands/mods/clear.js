const Discord = require("discord.js")
const Database = require('st.db')
const st = new Database(`lightbot`)
module.exports = {
    name: "clear",
    aliases: ["مسح"],
    description: "Deletes an amount of messages from a channel!",
    usage: "<number>",
     async execute(client, message, args)  {
      let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
  
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
  return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**Required permissions** \nMANAGE_MESSAGES`)
      .setColor("#ff0000")
      )
}
if (!message.guild.me.hasPermission("MANAGE_MESSAGES", "EMBED_LINKS"))
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**i Need permissions** \nMANAGE_MESSAGES`)
      .setColor("#ff0000")
      )
        const amount = args[0]
      //  if(!amount) return message.channel.send("**> :x: - Please give a number to delete!**")
        //if(isNaN(amount)) return message.channel.send("**> :x: - This has to be a number!**")
        if(parseInt(amount) > 99) return message.reply("**> :x: - You can only delete a maximum of 99 msgs at a time!**")
        await message.channel.bulkDelete(parseInt(amount)+1 || 99)
        message.channel.send(`**> Deleted \`${amount || "99"}\` messages!**`)
        .then(m => m.delete({timeout:5000}))
    }
}