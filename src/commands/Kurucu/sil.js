const config = require("../../../config.json");

module.exports = {
    name: "sil",
    aliases: ["temizle", "sil"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!args[0]) return message.reply({ embeds: [embed.setDescription("1-100 arasında bir rakam belirt.")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (isNaN(args[0])) return message.reply({ embeds: [embed.setDescription("Geçerli bir sayı belirt!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        await channel.bulkDelete(args[0]);
        message.channel.send({ content: (`${author} tarafından **${args}** mesaj silindi.`)})
    }
}