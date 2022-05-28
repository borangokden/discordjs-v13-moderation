const db = require("quick.db");
const config = require("../../../config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "rol-log",
  aliases: ["rollog", "rol-geçmişi", "rol-geçmiş"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    const member = message.mentions.users.first() || guild.members.cache.get(args[0]);
    if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (!member) return message.reply({ embeds: [embed.setDescription("Geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    const role = db.get(`rolelog_${member.id}`);
    if (!role) return message.reply({ embeds: [embed.setDescription(`${member} kullanıcısının rol verisi bulunmamakta.`)] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    message.reply({ embeds: [embed.setDescription(role.map((data) => `${data}`).join("\n"))] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 20000));
  }
}