const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const config = require("../../../config.json");

module.exports = {
    name: "snipe",
    aliases: ["snipe"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        let mesaj = db.get(`snipe.${message.guild.id}.${message.channel.id}`);
        if (!mesaj) {
            
            return message.reply({ embeds: [embed.setDescription(`Bu kanalda silinmiş bir mesaj bulunmamakta!`)] })
        }
        if (mesaj.icerik.toLowerCase().includes('discord.gg/') || mesaj.icerik.toLowerCase().includes('https') || mesaj.icerik.toLowerCase().includes('http') || mesaj.icerik.toLowerCase().includes('.com')) {
            
            return message.reply({ embeds: [embed.setDescription(`Son silinen mesajda reklam bulunmakta!`)] })
        }
        let mesajYazari = await message.guild.members.cache.get(mesaj.yazar);
        if (mesaj.icerik) {
            return message.reply({ embeds: [embed.setDescription(`
        Mesaj sahibi: ${mesajYazari ? mesajYazari : mesajYazari.tag} ( \`${mesajYazari.id}\` )
        Mesajın silinme tarihi: \`${moment.duration(Date.now() - mesaj.silinmeTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")}\` önce 
        
        Silinen Mesaj: \`${mesaj.dosya ? "Atılan mesaj bir dosya içeriyor." : mesaj.icerik}\`
        `)] });
        }
    }
}