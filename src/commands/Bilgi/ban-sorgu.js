const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const config = require("../../../config.json");

module.exports = {
    name: 'ban-sorgu',
    aliases: ["ban-bilgi", "banbilgi", "ban-info"],
  
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.penals.ban.staff)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let kullanici = args[0];
    if (!kullanici) return message.reply({ embeds: [embed.setDescription(`ID belirtmelisin.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    guild.bans.fetch()
        .then(bans => {
            if (!bans.has(kullanici)) {
                return message.reply({ embeds: [embed.setDescription(`${user.tag} yasaklı değil.`)] })
            }
        })
        guild.bans.fetch(kullanici).then(({ user, reason }) => {
            message.reply({ content: (`**${user.tag}** kullanıcısı \`${reason}\` sebebiyle yasaklanmış`)}) 

    })
}
}
