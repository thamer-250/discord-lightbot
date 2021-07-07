const Discord = require("discord.js")


module.exports = {
    name: "bug",
    async execute(client, message, args){
       

       let embed = new Discord.MessageEmbed()
       .setDescription("**😁 Now , you have 15 second to type your bug**")
       .setColor("#7289da")
       message.channel.send(embed).then(() => {

        const filter = user => user.author.id == message.author.id;

        message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ["time"]})
        
        then(collected => {
          
            message.delete()
            message.channel.send("**😉 Bug was successfully sent**")
            let ch = "843539813839536159"
            client.channels.cache.get(ch).send(new Discord.MessageEmbed()
            .setTitle("New Report")
            .setDescription(collected.first().content)
            .addField("By", `<@${message.author.id}>`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setTimestamp()
            .setColor("#7289da")
            )
        }).catch(err => {
            return;
        })
       });
    }
}