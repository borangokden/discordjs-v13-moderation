const config = require("../../../config.json")
const db = require('quick.db');
const moment = require("moment");
const limit = new Map();
moment.locale("tr");

module.exports = {
    name: "sponsor",
    aliases: ["sponsored", "destekçi"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.botcommands)) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        if (!member) return message.reply({ embeds: [embed.setDescription("Geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (member.id === author.id) return message.reply({ embeds: [embed.setDescription("Kendine bu rolü veremezsin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        
        guild.members.cache.get(member.id).roles.add(config.roles.sponsor);
        message.reply({ embeds: [embed.setDescription(`${member} üyesine <@&${config.roles.sponsor}> rolü verildi.`)] });
        
        client.channels.cache.get(config.logs.rollog).send({ embeds: [embed.setDescription(`${member} kullanıcısına ${message.author} tarafından <@&${config.roles.sponsor}> rolü verildi.
      
        \`Rolü Alan Kullanıcı:\` ${member} - (**${member.id}**)
        \`Rolü Veren Yetkili:\` ${message.author} - (**${message.author.id}**)
        \`Verilen Rol:\` <@&${config.roles.sponsor}>     
        \`Rol Verilme Tarihi:\` ${moment(Date.now()).format("LLL")}`)] });
    }
}
