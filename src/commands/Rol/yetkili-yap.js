const config = require("../../../config.json")
const db = require('quick.db');
const moment = require("moment");
const limit = new Map();
moment.locale("tr");

module.exports = {
    name: "yetkili-yap",
    aliases: ["yetki-ver", "yt"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.yetkilialim)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        let total = db.get(`subs_${author.id}`) || 0;
        if (!member) return message.reply({ embeds: [embed.setDescription("Geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (member.id === author.id) return message.reply({ embeds: [embed.setDescription("Kendine yetkili rolleri veremezsin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        
        guild.members.cache.get(member.id).roles.add(config.registration.staff);
        guild.members.cache.get(member.id).roles.add(config.registration.enaltyetkilirolü);
        message.reply({ embeds: [embed.setDescription(`${member} üyesine yetkili rolleri verildi.`)] });
        
        client.channels.cache.get(config.logs.rollog).send({ content: `${member} - \`(${member.id})\` kullanıcısına \`(${message.author.id})\` tarafından yetkili rolleri verildi.` });
    }
}
