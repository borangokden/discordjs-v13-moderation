const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const config = require("../../../config.json");

module.exports = {
    name: 'isimler',
    aliases: ["names", "nicknames"],
  
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0])
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        
        if (!member) return message.reply({ embeds: [embed.setDescription("Geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let names = db.get(`isimler_${member.id}`);
        if (!names) return message.reply({ embeds: [embed.setDescription(`${member} isim geçmişi bulunmamakta.`)] })
        message.reply({ embeds: [embed.setTitle("Geçmiş isimleri:").setDescription(names.map((data, n) => `**${n + 1}.** ${data}`).join("\n"))] })
    }
}
