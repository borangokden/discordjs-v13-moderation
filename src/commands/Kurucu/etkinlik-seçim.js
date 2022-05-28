const config = require("../../../config.json")
const db = require('quick.db');
const Discord = require("discord.js");
const moment = require("moment");
const limit = new Map();
moment.locale("tr");
module.exports = {
    name: "etkinlik-seçim",
    aliases: ["etkinlik"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  
      let button1 = new Discord.MessageButton()
          .setStyle('SUCCESS')
          .setEmoji('🎁')
          .setLabel('Çekiliş Katılımcısı')
          .setCustomId('etkinlik')
  
      let button2 = new Discord.MessageButton()
          .setStyle('SUCCESS')
          .setEmoji('🎉')
          .setLabel('Etkinlik Katılımcısı')
          .setCustomId('cekilis')
  
     
  
  
      let row = new Discord.MessageActionRow()
          .addComponents(button1, button2,)
      
    
  
      message.channel.send({ content:`Selamlar herkese, sunucumuz da bildirimlerden haberdar olmak isterseniz aşşağıdan butonlardan rollerinizi seçebilirsiniz.
  
<@&${config.buttons.çekiliş}>: Birbirinden güzel çekilişlerimizden haberdar olursunuz, almak için 🎉 basınız.
        
<@&${config.buttons.etkinlik}>: Etkinlik bildirimlerinden haberdar olursunuz, almak için 🎁 basınız.
  
      `, components: [row]  }) ;
  
  
  
  
    }
}
