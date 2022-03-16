import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CommandInteractionOptionResolver } from "discord.js";
import { Command } from "../structures/Command";

export = new Command({
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pong.'),
    run: async function(interaction: CommandInteraction) {
        await interaction.reply('bong.');
    }
});