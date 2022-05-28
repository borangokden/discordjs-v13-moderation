const db = require("quick.db");
const config = require("../../../config.json")

module.exports = {
    name: "ping",
    aliases: ["pong"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        message.reply({ content: `Anlık ping: " ${client.ws.ping} ms"`})
    } 
}