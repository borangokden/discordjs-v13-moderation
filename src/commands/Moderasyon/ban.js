const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "ban",
  aliases: ["yargı", "cu"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.penals.ban.staff)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let member = message.member
    let user = message.mentions.users.first() || guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(' ');
    if (!user) return message.reply({ embeds: [embed.setDescription('Banlanacak kullanıcıyı belirtmelisin.')] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (reason.length < 1) return message.reply({ embeds: [embed.setDescription('Geçerli bir sebep belirtmelisin.')] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (config.penals.ban.limit > 0 && limit.has(author.id) && limit.get(author.id) == config.penals.ban.limit) return message.reply({ embeds: [embed.setDescription("Saatlik ban sınırına ulaştın!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (!message.member.permissions.has("ADMINISTRATOR") && member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini banlayamazsın!")] })
    guild.members.ban(user, { reason: reason });
    message.reply({ embeds: [embed.setDescription(`**${user}** - **(${user.id})** kullanıcısı ${author} tarafından **"${reason}"** sebebiyle sunucudan yasaklandı. 
\`(Ceza ID: #${db.fetch(`ceza_${guild.id}`)})\``)] })
    if (config.bot.dmMessages) user.send(`**${message.guild.name}** sunucusundan yasaklandın.`).catch(() => {});
    db.add(`ceza_${guild.id}`, 1)

    client.channels.cache.get(config.penals.ban.log).send({ embeds: [embed.setDescription(`     
    ${user ? user.toString(): user.username} kullanıcısı ${author} tarafından sunucudan yasaklandı.

    Ceza ID: \`${db.fetch(`ceza_${guild.id}`)}\`
    Yasaklanan: ${user ? user.toString() : ""} - \`(${user.id})\`
    Yasaklayan Yetkili: ${author} - \`(${author.id})\`
    Yasaklama Sebebi: \`${reason}\`
    Yasaklama Tarihi: \`${moment(Date.now()).format("LLL")}\``)] });
    db.push(`sicil_${user.id}`, `${author} Tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle **(BAN)** cezası almış.`)
    db.add(`points_${member.id}`, (config.penals.points.banpoints));
    db.add(`ban_${member.id}`, 1)
    const cezaID = await db.fetch(`ceza_${guild.id}`)
    db.set(`${cezaID}`, `${member.user.tag} kullanıcısı ${author} tarafından ${moment(Date.now()).format("LLL")} tarihinde ${reason} sebebiyle **(BAN)** cezası almış.`)
    if (config.penals.ban.limit > 0) {
      if (!limit.has(author.id)) limit.set(author.id, 1);
      else limit.set(author.id, limit.get(author.id) + 1);
      setTimeout(() => {
        if (limit.has(author.id)) limit.delete(author.id);
      }, 1000 * 60 * 60)
    };
  }
};