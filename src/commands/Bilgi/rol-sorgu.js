const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const config = require("../../../config.json");

module.exports = {
    name: "rol-sorgu",
    aliases: ["rolsorgu", "rol-üye", "rolüye"],
    execute: async (client, message, args, embed, author, channel, guild) => {


        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if (!rol) return message.reply({ embeds: [embed.setDescription("Rol ID belirtmelisin.")] });
    let rolsayi = message.guild.members.cache.filter(piece => piece.roles.cache.has(rol.id)).size


    message.reply({ embeds: [embed.setDescription(`<@&${rol.id}> rolünde **${rolsayi}** üye var.`)] });


}
}