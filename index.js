const { Collection } = require("discord.js")
const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = ["+"]

client.on("ready", async () => {
  console.log('ready!')
  // client.user.setActivity(`+invite, +help`)
   
})

client.on('ready', () => {

  function th() { 
   let light = [`+help`, `+invite`];
   let math = Math.floor(Math.random() * light.length);
   client.user.setActivity(light[math]);
  };
  
  setInterval(th, 10000)
  
  })
const Database = require('st.db')
const st = new Database(`lightbot`,{
  api: true,
})


/*client.on("message", message => {
  if(message.author.bot)return;
  if(!message.channel.id == "816667289726091335") return;
 if(message.channel.id == "816667289726091335"){
message.react("835925248598605834")
 }
}); */


/////////////////////////////
client.commands = new Collection();
client.aliases = new Collection();
['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});
client.on('message', async message => {
	if (message.author.bot) return
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member)
		message.member = await message.guild.fetchMember(message);
    	

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	if (command) command.execute(client, message, args);
});



/////////////////////////


/////////////////////////////



client.on("guildCreate", guild => {
  client.channels.cache.get("835540072341962804")
    .send(new Discord.MessageEmbed()
    .setThumbnail(guild.iconURL({ format: "png", dynamic: true, size: 1024 }))
    .setColor('#00ff14')
    .setDescription(`Server Name: \`${guild.name}\` \nServer ID: \`${guild.id}\` \nServre owner: ${guild.owner} \nServer Count: \`${guild.memberCount}\` \nServers: \`${client.guilds.cache.size}\``)
    )
});

client.on("guildDelete", guild => {
  client.channels.cache.get("835540098564620288")
    .send(new Discord.MessageEmbed()
    .setThumbnail(guild.iconURL({ format: "png", dynamic: true, size: 1024 }))
    .setColor('#ff0004')
    .setDescription(`Server Name: \`${guild.name}\` \nServer ID: \`${guild.id}\` \nServre owner: ${guild.owner} \nServer Count: \`${guild.memberCount}\` \nServers: \`${client.guilds.cache.size}\``)
    
    );
});

const DBL = require("dblapi.js")
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzMjE4NjQ2NTY0NzU5MTQ1NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjIwNzcxNDQ5fQ.l0fZFfdAL2NgX5gT_GGOEPINkuGUb1j08op16CCRUB4')



/*ient.on('message', msg=>{
  let ech = st.get(`autoembed_${msg.guild.id}`)
     if(ech === null){
       return;
     }
  if (msg.channel.id !== ech) return;
    if (msg.author.bot) return;
  if (!msg.channel.guild) return;
 var channel = client.channels.cache.get(ech);

   msg.delete()
  var embed = new Discord.MessageEmbed()
  .setAuthor(msg.guild.name)
  
  .setThumbnail(msg.guild.iconURL({ format: "png", dynamic: true, size: 1024 }))
  .setColor('#0x2F3136')
  .setDescription(`${msg.content}`)
  .setFooter(`${msg.author.username}`, `${msg.author.avatarURL({ format: "png", dynamic: true, size: 1024 })}`)
  client.channels.cache.get(ech).send(embed)
  
     });*/

//




/*const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();*/

client.on('guildMemberAdd', async member => {



     let chx = st.get(`wel_${member.guild.id}`)
     if(chx === null){
       return;
     }

  

let embed = new Discord.MessageEmbed()  
.setTitle(`Member joined #${member.guild.memberCount}!`)
.setDescription(`**Welcome To ${member.guild.name}** \n**User: ${member}**`)
.setThumbnail(member.guild.iconURL({ format: "png", dynamic: true }))
.setColor("#7289da")

   client.channels.cache.get(chx).send(embed);  

  });


/*client.on('guildMemberAdd', async member => {
	let chx = st.get(`wel_${member.guild.id}`)
     if(chx === null){
       return;
     }
    
    
    
  
   

   let data = await canva.welcome(member, { gradiant: "darkness" })

    const attachment = new Discord.MessageAttachment(
      data,
      "welcome-image.png"
    );
   
    client.channels.cache.get(chx).send(`**Welcome to ${member.guild.name}** \n**User: ${member}**`, attachment);
  });*/
   
  


/*client.on('message', message => {
	if (message.content === 'h') {
		client.emit('guildMemberAdd', message.member);
	}
});*/
client.on("guildMemberAdd", member => {
  let autorolefetch = st.get(`autorole_${member.guild.id}`)
  let autorole = member.guild.roles.cache.get(autorolefetch)
  if(autorole) {
    member.roles.add(autorole)
  } else return;
})
//////////// LOGS ///////////////

/*client.on("channelCreate", function(channel) {
  let ContentEmbed = new Discord.MessageEmbed();
  ContentEmbed.setColor("#ff0005");
  ContentEmbed.setTitle("**Log-Type:** CHANNEL_CREATE");
  ContentEmbed.setDescription(`**Channel Name:** \`${channel.name}\` \n**Channel Type:** \`${channel.type}\` \n**Time:** \`${channel.createdAt}\``);


  let lchh = st.get(`logs_${channel.guild.id}`)
     if(lchh === null){
       return;
     }
     let lchh1 = client.channels.cache.get(lchh)

  lchh1.send(ContentEmbed);
});*/

/*client.on("channelDelete", function(channel) {
 

  let ContentEmbed = new Discord.MessageEmbed();
  ContentEmbed.setColor("#ff0005");
  ContentEmbed.setTitle("**Log-Type:** CHANNEL_DELETE");
  ContentEmbed.setDescription(`**Channel Name:** \`${channel.name}\` \n**Channel Type:** \`${channel.type}\` \n**Time:** \`${channel.createdAt}\``);
  
  let lchh = st.get(`logs_${channel.guild.id}`)
     if(lchh === null){
       return;
     }
     let lchh1 = client.channels.cache.get(lchh)

  lchh1.send(ContentEmbed);
});*/

/*client.on("channelUpdate", function(oldChannel, newChannel) {
 
  let ContentEmbed = new Discord.MessageEmbed();
  ContentEmbed.setColor("#ff0005");
  ContentEmbed.setTitle("**Log-Type:** CHANNEL_UPDATED");
  ContentEmbed.setDescription(`**Old Channel Name:** \`${oldChannel.name}\` \n**New channel name:** \`${newChannel.name}\` \n**Channel Type:** \`${newChannel.type}\` \n**Time:** \`${newChannel.createdAt}\``);
  
  let lchh = st.get(`logs_${oldChannel.guild.id}`)
     if(lchh === null){
       return;
     }

  client.channels.cache.get(lchh).send(ContentEmbed);
});*/
/*
client.on("guildBanAdd", function(guild, user) {
 
  let ContentEmbed = new Discord.MessageEmbed();
  ContentEmbed.setColor("#5f6fff");
  ContentEmbed.setTitle("**Log-Type:** MEMBER_BANNED");
  ContentEmbed.setDescription(`**User:** ${user} \`${user.username} [${user.id}]\` \n**Time:** \`${user.createdAt}\``);
  
  let lchh = st.get(`logs_${user.guild.id}`)
     if(lchh === null){
       return;
     }

  client.channels.cache.get(lchh).send(ContentEmbed);
});*/
/*
client.on("messageDelete", function(message) {

  let ContentEmbed = new Discord.MessageEmbed();
  ContentEmbed.setColor("#00ff00");
  ContentEmbed.setTitle("**Log-Type:** DELETE_MESSAGE");
  ContentEmbed.setDescription(`**Message:** \`${message}\` \n**Channel:** \`${message.channel.name}\` \n**User:** <@${message.author.id}> \`${message.author.username} [${message.author.id}]\``);
  

  let lchh = st.get(`logs_${message.guild.id}`)
     if(lchh === null){
       return;
     }

  client.channels.cache.get(lchh).send(ContentEmbed)
});
*/
/*
client.on("messageUpdate", function(oldMessage, newMessage) {
 
 

  let ContentEmbed = new Discord.MessageEmbed();
  ContentEmbed.setColor("#00ff00");
  ContentEmbed.setTitle("**Log-Type:**  EDIT_MESSAGE");
  ContentEmbed.setDescription(`**Old Message:** \`${oldMessage}\` \n**New Message**: \`${newMessage}\` \n**Message ID:** [here](https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`);
 let lchh = st.get(`logs_${newMessage.guild.id}`)
     if(lchh === null){
       return;
     }

  client.channels.cache.get(lchh).send(ContentEmbed);
});*/

const logs = require('discord-logs');
logs(client);
client.on('guildMemberBoost', (member) => {
  let bchh = st.get(`boost_${member.guild.id}`)
     if(bchh === null){
       return;
     }


 
client.channels.cache.get(bchh).send(`<a:LightBotNitro:834873296855891998> ${member.user.tag} thanks for boosting the server!`);

});
///////////// LOGS //////////////

//





/////



//





//
client.login("")
//


