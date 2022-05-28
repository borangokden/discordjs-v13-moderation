const Discord = require('discord.js');
const config = require("../../config.json");
const db = require("quick.db");
const {MessageEmbed} = require("discord.js");
const client = global.client;


module.exports = async function(oldUser, newUser) {
    const guild = client.guilds.cache.get(config.Guild.GuildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === config.roles.team)
    const ownerr = client.users.cache.get("796263552771817472");
    const member = guild.members.cache.get(newUser.id)
    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setFooter({text: (config.bot.BotFooter)})
    let taglıüye = await guild.members.cache.filter(member => member.user.username.includes(config.registration.GuilDTag)).size
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(config.registration.GuilDTag) && !newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.remove(config.roles.team)
            client.channels.cache.get(config.logs.taglog).send({ embeds: [embed.setDescription(`${newUser} isminden tagımızı çıkartarak aramızdan ayrıldı! \n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` - Sonra ki kullanıcı adı: \`${newUser.tag}\``)]})
        } else if (!oldUser.username.includes(config.registration.GuilDTag) && newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.add(config.roles.team)
            client.channels.cache.get(config.channels.chat).send(`${newUser} üyesi tagımızı alarak aramıza katıldı.`)
            client.channels.cache.get(config.logs.taglog).send({ embeds: [embed.setDescription(`${newUser} ismine tagımızı alarak aramıza katıldı! \n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` - Sonra ki kullanıcı adı: \`${newUser.tag}\``)]})
        }
    }
  
    if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == config.registration.GuildDiscrim && newUser.discriminator !== config.registration.GuildDiscrim) {
            member.roles.remove(role)
            client.channels.cache.get(config.logs.taglog).send({ embeds: [embed.setDescription(`${newUser} kullanıcısı etiket tagımızı çıkartarak aramızdan ayrıldı! \n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` - Sonra ki kullanıcı adı: \`${newUser.tag}\``)]})
        } else if (oldUser.discriminator !== config.registration.GuildDiscrim && newUser.discriminator == config.registration.GuildDiscrim) {
            member.roles.add(role)
            client.channels.cache.get(config.logs.taglog).send({ embeds: [embed.setDescription(`${newUser} kullanıcısı etiket tagımızı alarak aramıza katıldı! \n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` - Sonra ki kullanıcı adı: \`${newUser.tag}\``)]})
            client.channels.cache.get(config.channels.chat).send(`${newUser} üyesi etiket tagımızı alarak aramıza katıldı.`)
        }
    }
}

module.exports.conf = {
    name: "userUpdate"
}