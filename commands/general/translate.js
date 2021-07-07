const Discord = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");
const Database = require('st.db')
const st = new Database(`lightbot`)
const co = new Set();
module.exports = {
  name: "translate",
  aliases: ["tr"],
  descriptionr: "Translate text from language to another language",
  usage: "<language> <text>",
  async execute(client, message, args){
  
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**i Need permissions** \nEMBED_LINKS`)
      )
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklist`)
  
    if (co.has(message.author.id)) {
            message.channel.send(`**> ${message.author.username}**, Cool down (**5 seconds** left)`).then((msg) => {
    setTimeout(function() {
    msg.delete();
  }, 5000)});
    } else {
let language = args[0];
  let text = args.slice(1).join(" ")

  if (!language) return message.channel.send(`> What language an I supposed to translate to?`)
  if (language.length !== 2) return message.channel.send(`> Language must be 2 letter alias E.g \`English > en\``)
  if (!text) return message.channel.send(`> What am i supposed to translate?`)
 const result = await translate(text, { to: language})
  const embed = new Discord.MessageEmbed()
  .setDescription(`> ${text} => ${result.text}`)
  .setTitle("Google Translate")
 // .setFooter(language.result)
  .setColor("#0x2F3136");
  message.channel.send(embed);
 
 
  
        co.add(message.author.id);
        setTimeout(() => {
          co.delete(message.author.id);
        }, 5000);
    }
  

  
  }
}