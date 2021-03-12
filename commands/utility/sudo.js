module.exports = {
    name: 'sudo',
    description: 'Makes a webhook to impersonate someone',
    usage: 'sudo <user> <message>',
    category: 'utility',
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(user !== client.user.id) return;
        if(!user) return message.channel.send('Please provide a user!')
        const webhook = await message.channel.createWebhook(user.displayName, {
            avatar: user.user.displayAvatarURL(),
            channel: message.channel.id
        })
        await webhook.send(args.slice(1).join(' ')).then(() => {
            webhook.delete()
        })
    }
}