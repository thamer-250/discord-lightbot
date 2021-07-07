const Discord = require("discord.js")
const Database = require('st.db')
const st = new Database(`lightbot`)

module.exports = {
    name: "send",
    description: "Send a message in a specific channel",

    async execute(client, message, args){
    
      if(!message.member.hasPermission("MANAGE_CHANNELS")){
        return message.channel.send(new Discord.MessageEmbed()
            .setTitle('**:x: Error**')
            .setDescription(`**Required permissions** \nMANAGE_CHANNELS`)
            .setColor("#ff0000")
            )
      }
      if (!message.guild.me.hasPermission("MANAGE_CHANNELS", "EMBED_LINKS"))
            return message.channel.send(new Discord.MessageEmbed()
            .setTitle('**:x: Error**')
            .setDescription(`**i Need permissions** \nMANAGE_CHANNELS`)
            .setColor("#ff0000")
            )
          
      
         let command = args[0];
  let first = args[1];
  if(!command) return message.channel.send(`**> 1 - +send embed \`[#channel]\` \`[#color]\` \`[message]\`** \n**> 2 - +send none \`[#channel]\` \`[message]\`**`)
  if(command.toLowerCase() === 'embed') {
    let pollChannel = message.mentions.channels.first();
    if(!pollChannel) return message.channel.send("**> +send embed `[#channel]` `[#color]` `[message]`**")
   // const Thamer = args.slice(1).join(" ");
   // if(!Thamer) return;
     let argss = message.content.split(" ")
  if(!argss) return message.channel.send(`**> :x: - +send embed \`color\` \`description\``)
  const r = argss[3] 
  if(!r) return;
 const Thamer = argss.slice(4).join(" ");
   if(!Thamer) return;
  const embed = new Discord.MessageEmbed()
.setColor(`${r}`)
.setDescription(Thamer)
  pollChannel.send(embed)
  }
if(command.toLowerCase() === 'none') {
  let none = message.mentions.channels.first();
  if(!none) return message.channel.send("**> +send none `[#channel]` `[message]`**")
 // const Thamer = args.slice(1).join(" ");
 // if(!Thamer) return;
   let argsss = message.content.split(" ")
if(!argsss) return message.channel.send(`**> :x: - +send none \`message\``)
const Thamer = argsss.slice(3).join(" ");
 if(!Thamer) return;
none.send(Thamer)

}

    }}