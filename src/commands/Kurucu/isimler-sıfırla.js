const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")
module.exports = {
  name: "isimler-sıfırla",
  aliases: ["isimler-sifirla", "isim-sıfırla"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    
    if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  
    var member = message.mentions.users.first() || guild.members.cache.get(args[0]);

if (!member) {
let isimler = db.delete(`isimler_${author.id}`) || [];
message.reply({ embeds: [embed.setDescription(`İsim verilerin başarıyla silindi.`)] });
}
  
if(member) {
let isimler = db.delete(`isimler_${member.id}`) || [];
message.reply({ embeds: [embed.setDescription(`${member} üyesinin isim verileri başarıyla silindi.`)] });

};
  
}
  

  }