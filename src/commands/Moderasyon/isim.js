const config = require("../../../config.json")
const db = require("quick.db");

module.exports = {
    name: "isim",
    aliases: ["i", "nickname"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        var name = args[1]

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!name) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir isim belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        db.push(`isimler_${member.id}`, ` \`${name}\` ${message.author} tarafından değiştirilmiş.`);
        await guild.members.cache.get(member.id).setNickname(`${name}`);
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısının ismi \`${name}\` olarak değiştirildi.`)] }).catch((err) => console.log(err), client.ytick(message))
    }
}
