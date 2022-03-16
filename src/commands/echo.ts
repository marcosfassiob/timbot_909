import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { Command } from "../structures/Command"

export = new Command({
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('echooo')
        .addStringOption(option => option
            .setName('string')
            .setDescription('string you wanna echo')
            .setRequired(true)),
    run: async function(interaction: CommandInteraction) {
        const data = interaction.options.getString('string');
        await interaction.reply({
            content: data
        })
    }
});