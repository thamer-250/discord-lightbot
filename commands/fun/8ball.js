const Discord = require('discord.js');
const Database = require('st.db')
const st = new Database(`lightbot`)
const answers = [
    'Oh hell yeah',
    'Hello no',
    'Yes I guess ?',
    'Probably wrong', 
    'You never know',
    'I guess ?',
    'Well tbh I don\'t know',
    'Umm maybe ?',
    'Nah',
    'Yup',
    'I have a doubt',
    'Cannot predict now',
    'I can see it'
]

module.exports = {
    name: "8ball",
    description: "I'm telling you the truth",
 async execute(client, message, args){
    let blacklisted = st.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send(`:x: - you are blacklisted`)
        const question = args.join(' ');
        if (!question) 
        return message.channel.send('**:x: - Please provide a question to ask**');

        const embed = new Discord.MessageEmbed()
       
          .addField('Question', `\`\`\`${question}\`\`\``)
          .addField('Answer', `\`\`\`${answers[Math.floor(Math.random() * answers.length)]}\`\`\``)
          .setFooter(`Asked by ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
        message.channel.send(embed);
    }
}