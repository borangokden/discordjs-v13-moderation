const config = require("../../../config.json");

module.exports = {
    name: "rolsüz",
    aliases: ["rolsuz"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        let bg = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (args[0] == "ver") {
            bg.forEach(r => {
                r.roles.add(config.registration.unregistered)
            });
            message.reply({ embeds: [embed.setDescription("Sunucuda rolü olmayan \`"+ bg.size +"\` üyeye kayıtsız rolü verildi.")] })
        } else if (!args[0]) {
            message.reply({ embeds: [embed.setDescription("Sunucuda rolü olmayan \`"+ bg.size +"\` kişi bulunmakta.")] })
        }
    }
}
