const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "kayıtsız-etiketle",
    aliases: ["kayıtsızlar", "kayitsizlar"],
    execute: async (client, message, args, embed, author, channel, guild) => {
      if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
if (1 > 0 && limit.has(author.id) && limit.get(author.id) == 1) return channel.send("Saatlik kayıtsız etiketleme sınırına ulaştın!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        let role =  guild.roles.cache.find(rol => rol.id === config.registration.unregistered)
        channel.send(`<@&${config.registration.unregistered}> hey, yönetici sizi teyit kanallarına çağırıyor.`)
    if (1 > 0) {
      if (!limit.has(author.id)) limit.set(author.id, 1);
      else limit.set(author.id, limit.get(author.id) + 1);
      setTimeout(() => {
        if (limit.has(author.id)) limit.delete(author.id);
      }, 1000 * 60 * 60)
    }
  }
}