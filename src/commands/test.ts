import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { Command } from "../structures/Command"

export = new Command({
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('testing embed image sizes'),
    run: async function(interaction: CommandInteraction) {
        const embed = new MessageEmbed()
            .setColor('DARK_BLUE')
            .setTitle('why are you here?')
            .setDescription('testing 123')
            .setImage('https://gyazo.com/0c1eb08e22010743dfd2194c658fc71f');
        
        await interaction.reply({
            embeds: [ embed ],
            ephemeral: true
        });
    }
});