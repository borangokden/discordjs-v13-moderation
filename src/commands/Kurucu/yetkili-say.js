const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "yetkili-say",
  aliases: ["ytsay", "yetkilisay", "ysay"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    var aktif = (message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(config.registration.staff) && yetkili.presence && yetkili.presence.status !== "offline").size)    
    let sesdeolmayanlar = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(config.registration.staff)).filter(yetkilises => !yetkilises.voice.channel && yetkilises.presence && yetkilises.presence.status != "offline")
        message.reply({ content: `
Sesli kanallarda olmayan yetkililer;
${sesdeolmayanlar.map(yetkili => `${yetkili}`).join(', ')}
`}) 
    }
}
