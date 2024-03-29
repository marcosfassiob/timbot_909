import { EmbedBuilder, RGBTuple, SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, User } from "discord.js";
import { Command } from "../structures/Command";
import { CommandType } from "../util/CommandType";
import { embedColorCode, botOwnerID } from "../../config.json"

export = new Command({
    type: CommandType.Information,
    usage: "/info",
    builder: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Displays information about this bot'),
    run: async function(interaction: ChatInputCommandInteraction) {
        // TODO add client version, bot owner
        
        await interaction.client.application.fetch()
        const embed = new EmbedBuilder()
            .setColor(embedColorCode as RGBTuple)
            .setTitle(`About ${interaction.client.user.username}`)
            .setDescription(`This bot is owned by **${(await interaction.client.users.fetch(botOwnerID)).tag}**.`)
            .setFooter({ text: `Developed by ${(interaction.client.application.owner as User).tag}. DM me if you want a custom bot!`})

        return await interaction.reply({
            embeds: [ embed ]
        })
    }
})