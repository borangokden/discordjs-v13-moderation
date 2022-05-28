const db = require("quick.db");
const config = require("../../../config.json")

module.exports = {
    name: "ceza-bilgi",
    aliases: ["cid", "id-bilgi", "ceza", "cb"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole) && !message.member.roles.cache.has(config.penals.jail.staff)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        const ID = args[0];
        if (!ID || isNaN(ID)) return message.reply({ embeds: [embed.setDescription("Geçerli bir bir Ceza ID belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        const data = db.fetch(ID);
        if (!data) return message.reply({ embeds: [embed.setDescription(`\`#${ID}\` ID'li ceza bulunamadı.`)] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        message.reply({ embeds: [embed.setDescription(`\`#${ID}\` ID'li cezanın bilgileri.
        
        ${data}`)] })
    }
}