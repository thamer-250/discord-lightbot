const Discord = require("discord.js");
const moment = require("moment");
const ms = require("ms")
const Database = require('st.db')
const st = new Database(`lightbot`)
//const { getAverageColor } = require('fast-average-color-node')
const co = new Set()
module.exports = {
  name: 'userinfo',
  aliases: ["user"],
  description: "Get information on a user.",
  usage: "<user>",
  async execute(client, message, args){
     let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
   

    if (co.has(message.author.id)) {
            message.channel.send(`**> ${message.author.username}**, Cool down (**5 seconds** left)`).then((msg) => {
    setTimeout(function() {
    msg.delete();
  }, 5000)});
    } else {
 //let user = (message.mentions.users.first()) || message.author; 
 //const member = message.mentions.members.first() || message.member; 

 let user = message.mentions.users.first()
 var member = message.mentions.users.first()
 var heg;
 if (member) {
     heg = member
 } else {
     heg = message.author
 }
 var mentionned = message.mentions.members.first()
 var h;
 if (mentionned) {
     h = mentionned
 } else {
     h = message.member
 }
 //const color = await getAverageColor(heg.displayAvatarURL({ format: 'png' }))
    //
    const status = {
    online: "<:online:823621143864279111>",
    idle: "<:idle:823621337033343007>",
    dnd: "<:donotdistrub:823620774564462672>",
    offline: "<:offline:823621568324042823>"
};
 const flags = {
 //   DISCORD_EMPLOYEE: "Discord Employee",
    DISCORD_PARTNER: "<:Partner:772896174402437120>",
    BUGHUNTER_LEVEL_1: "<:bugHunter:823617081965805618>",
    BUGHUNTER_LEVEL_2: "<:bugHunter_2:823617399114563625>",
    HYPESQUAD_EVENTS: "<:hypesquadEvents:823617667256680488>",
    HOUSE_BRAVERY: "<:bravery:823619182566441040>",
    HOUSE_BRILLIANCE: "<:brilliance:823619422593613886>",
    HOUSE_BALANCE: "<:balance:823618840151457803>",
    EARLY_SUPPORTER: "<:early_supporter:823619706887340092>",
   // TEAM_USER: "Team User",
   // SYSTEM: "System",
    //VERIFIED_BOT: "Verified Bot",
    VERIFIED_DEVELOPER: "<:verifiedbotdeveloper:823620185499238400>"
  };


    //

    moment.locale('en-US');


    let embed = new Discord.MessageEmbed()
    .setThumbnail(heg.avatarURL())
    .setColor(h.displayHexColor)
    .addField('**Name**', `${heg.tag}`, true)
    .addField('**Status**', `${status[h.presence.status]}`, true)
    .addField('**Top role**', `${h.roles.highest}`, true)
    .addField('**Bot**', `${heg.bot ? '✅' : '❌'}`, true)
     .addField("**Created at**",`${moment(heg.createdTimestamp).fromNow()}`, true)
    .addField('**Joined at**',`${moment(h.joinedAt).fromNow()}`, true)
    .addField(
      "**Flags**",
      heg.flags.toArray().length
        ? heg.flags
            .toArray()
            .map(flag => flags[flag])
            .join(" ")
        : "None", true
    )
    .addField("**Roles**", `${h.roles.cache.filter(r => r.name !== '@everyone').map(r => `${r}`).join(',')}`, true)
    message.channel.send(embed)


        co.add(message.author.id);
        setTimeout(() => {
          co.delete(message.author.id);
        }, 5000);
    }
   
    
  }
}
