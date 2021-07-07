const Discord = require('discord.js')
const Database = require('st.db')
const st = new Database(`lightbot`)

module.exports = {
  name: 'vote',
  description: "Send a vote in a specific channel",
  usage: "<channel> <message>",
  
  async execute(client, message, args){
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
  
if(!message.member.hasPermission("MANAGE_MESSAGS"))
  return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**Required permissions** \nMANAGE_MESSAGS`)
      .setColor("#7289da")
      )

 
    const pollChannel = message.mentions.channels.first();
    if(!pollChannel) message.channel.send("**> +vote `[#channel]` `[message]`**")
    const Thamer = args.slice(1).join(" ");
    if(!Thamer) return;
    let embed = new Discord.MessageEmbed()
   //   .setTitle("New message!!")
      .setDescription(Thamer)
      .setColor("#fffb00");
    pollChannel.send(embed).then(function(message) {
      message.react("<a:done:834188397609222215>");
      message.react("<a:error:834188411195359252>");
    })
  }
}
