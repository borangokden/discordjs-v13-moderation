const Discord = require("discord.js");
const db = require("quick.db")
const ms = require("ms");
const config = require("../../../config.json");
const moment = require("moment")

module.exports = {
  name: "r",
  aliases: ["role", "rol"],
  owner: true,
  execute: async (client, message, args, embed, author, channel, guild) => {
    
    if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.botcommands)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let member = message.mentions.members.first() || guild.members.cache.get(args[1]);
     if(!member) return message.reply({ embeds: [embed.setDescription(`Geçerli bir kullanıcı belirtmelisin!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
     let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
     if(!rol) return message.reply({ embeds: [embed.setDescription(`Geçerli bir rol belirtmelisiniz!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  
     if (!message.member.permissions.has(8)) {
     if (rol.id === "848920653653606415") return message.reply({ embeds: [embed.setDescription(`Bu rolü veremezsiniz veya alamazsınız!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
     }
  
     if(member.roles.highest.position <= rol.position) return message.reply({ embeds: [embed.setDescription(`${member} kullanıcısının en yüksek rolü ${member.roles.highest} rolüdür kullanıcıya bu rolden üstte bir rol veremezsiniz veya alamazsınız!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
     if(message.member.roles.highest.position <= rol.position) return message.reply({ embeds: [embed.setDescription(`Sizin en yüksek rolünüz ${message.member.roles.highest} rolüdür herhangi bir kullanıcıya bu rolden üstte bir rol veremezsiniz!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
   if (args[0] == "ver") {
       if(!member.roles.cache.has(rol)) {
await member.roles.add(rol)
message.reply({ embeds: [embed.setDescription(`${member} üyesine ${rol} rolü verildi!`)] })
client.channels.cache.get(config.logs.rollog).send({ embeds: [embed.setDescription(`
\`Rolü Alan Kullanıcı:\` ${member} - (**${member.id}**)
\`Rolü Veren Yetkili:\` ${message.author} - (**${message.author.id}**)
\`Verilen Rol:\` ${rol}    
\`Rol Verilme Tarihi:\` ${moment(Date.now()).format("LLL")}`)] });

       } else {
        message.reply({ embeds: [embed.setDescription(`${member} üyesinde ${rol} rolü bulunmakta!`)] })
       }
   } else if (args[0] == "al") {
if(member.roles.cache.has(rol)) {
    message.reply({ embeds: [embed.setDescription(`${member} üyesinde ${rol} rolü bulunmamaktadır!`)] })
} else {
    await member.roles.remove(rol)
    message.reply({ embeds: [embed.setDescription(`${member} üyesinden ${rol} rolü alındı!`)] })
    client.channels.cache.get(config.logs.rollog).send({ embeds: [embed.setDescription(`
    \`Rolü Alınan Kullanıcı:\` ${member} - (**${member.id}**)
    \`Rolü Alan Yetkili:\` ${message.author} - (**${message.author.id}**)
    \`Alınan Rol:\` ${rol}
    \`Rol Alınma Tarihi:\` ${moment(Date.now()).format("LLL")}`)] });
}
   } else if (!args[0]) { 
    message.reply({ embeds: [embed.setDescription(`Geçerli bir seçenek belirtmelisin! \`.rol al/ver @BoranGkdn/ID @Rol/ID\``)] })
   }
 }
  }