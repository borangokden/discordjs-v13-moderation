const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");

module.exports = async (oldMember, newMember) => {
    const entry = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE' }).then(audit => audit.entries.first());
    const author = entry.executor
    if (author.bot) return;
    const role = oldMember.roles.cache.find(s => !newMember.roles.cache.has(s.id)) || newMember.roles.cache.find(s => !oldMember.roles.cache.has(s.id))
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        db.push(`rolelog_${newMember.id}`, `\`${moment(Date.now()).format("LLL")} ${author} tarafından ${role} rolü eklenmiş.\``)
    } else {
        db.push(`rolelog_${newMember.id}`, `\`${moment(Date.now()).format("LLL")} ${author} tarafından ${role} rolü kaldırılmış.\``)
    }
}

module.exports.conf = {
    name: "guildMemberUpdate"
}