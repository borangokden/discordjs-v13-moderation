const { MessageEmbed } = require("discord.js");
const moment = require("moment")
require('moment-duration-format');
const config = require("../../../config.json");

module.exports = {
    name: "info",
    aliases: ["servers", "serverinfo", "serverbilgi", "sunucu-bilgi"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        message.reply({ embeds: [embed.setDescription(`
   
    \`•\` Sunucuda toplam **${guild.memberCount}** kişi bulunmakta.
    \`•\` Son 1 Saatte Giren Üyeler  **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 3600000).size}**
    \`•\` Son 1 Günde Giren Üyeler  **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size}**
    \`•\` Son 1 Haftada Giren Üyeler **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size}**
    \`•\` Son 1 Ayda Giren Üyeler **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size}**`)] })
    }
};