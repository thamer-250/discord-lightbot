const { MessageEmbed } = require("discord.js");
const Database = require('st.db')
const st = new Database(`lightbot`)

module.exports = {
  name: "addrole",
  aliases: ["giverole", "add-role"],
  description: "Add a role for a user",
  usage: "<user> <role>",
async execute(client, message, args){

    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`> :x: - you are blacklisted`)
   
 if(!message.member.hasPermission("MANAGE_ROLES")){
  return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**Required permissions** \nMANAGE_ROLES`)
      .setColor("#ff0000")
      )
}
if (!message.guild.me.hasPermission("MANAGE_ROLES", "EMBED_LINKS"))
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**:x: Error**')
      .setDescription(`**i Need permissions** \nMANAGE_ROLES`)
      .setColor("#ff0000")
      )
        //if (!args[0]) return message.channel.send("**:x: - please mention role**")

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]); 
        if (!rMember) return message.channel.send("**> :x: - please mention member**");
        if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**:x: - Cannot addrole to this member!**')

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!args[1]) return message.channel.send("**> x: - please mention role**")

        if (!role) return message.channel.send("**> :x: - I did not find this role**")

        if (role.managed) return message.channel.send("**> :x: - Cannot addrole to this member!**")
        if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send('**Role Is Currently Higher Than Me Therefore Cannot Add It To The User!**')

        if (rMember.roles.cache.has(role.id)) return message.channel.send("**> :rolling_eyes: - member already has the role!**")
        if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id);
        
        message.channel.send(`**> Change Roles For ${rMember}** \`+${role.name}\``)

      

       
    }
};