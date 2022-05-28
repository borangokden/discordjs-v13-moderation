const config = require("../../../config.json");
const db = require("quick.db");

module.exports = {
  name: "zengin",
  aliases: ["booster"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.roles.booster)) return message.reply({ embeds: [embed.setDescription(`Booster olmanız gerekiyor.!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let name = args.slice(0).join(' ');
    if (!name) return message.reply({ embeds: [embed.setDescription(`Geçerli bir kullanıcı adı giriniz.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (name.length > 32) message.reply({ embeds: [embed.setDescription(`**32** karakteri geçmeyen bir isim belirtiniz!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    guild.members.cache.get(author.id).setNickname(name).then(x => message.reply({ embeds: [embed.setDescription(`Kullanıcı adın başarıyla **${name}** olarak değiştirildi.`)] }))
  }
}