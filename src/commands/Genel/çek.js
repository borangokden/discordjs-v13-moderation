const config = require("../../../config.json");
const db = require("quick.db");

module.exports = {
  name: "çek",
  aliases: ["cek"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.penals.transport.staff)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!message.member.voice.channel) {
            return message.channel.send({ embeds: [embed.setDescription(`Öncelikle geçerli bir ses kanalında bulunmalısınız.`)] });
        }
        if (!member) {
            return message.channel.send({ embeds: [embed.setDescription(`Öncelikle geçerli bir kullanıcı belirtmelisiniz.`)] });
        }
        if (member.user.bot) {
            return message.channel.send({ embeds: [embed.setDescription(`Yanına bir bot çekemezsin.`)] });
        }
        if (message.member.id === member.id) {
            return message.channel.send({ embeds: [embed.setDescription(`Kendini neden çekmeye çalışıyorsun?`)] })
        }
        if (message.member.voice.channel === member.voice.channel) {
            return message.channel.send({ embeds: [embed.setDescription(`Belirttiğiniz kullanıcıyla aynı odadasınız.`)] });
        }
        if (!member.voice.channel) {
            return message.channel.send({ embeds: [embed.setDescription(`Belirtilen kullanıcı herhangi bir ses kanalında değil.`)] });
        } else {
            member.voice.setChannel(message.member.voice.channel.id)
            message.channel.send({ embeds: [embed.setDescription(`${member}, üyesi <#${member.voice.channel.id}> kanalından <#${message.member.voice.channel.id}> kanalına ${message.author} yetkilisi tarafından çekildi. (bg)`)] })
        }
    }
}