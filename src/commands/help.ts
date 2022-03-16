import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { json_commands } from "..";
import { Command } from "../structures/Command";

export = new Command({
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Returns a list of commands'),
    run: async function(interaction: CommandInteraction) {

        let desc: string = "";
        for (let i: number = 0; i < json_commands.length; i++) {
            desc = desc.concat(`**${json_commands[i].name}:** ${json_commands[i].description}\n`)
        }

        const embed: MessageEmbed = new MessageEmbed()
            .setColor('DARK_GREEN')
            .setTitle('List of commands for TimBot 909')
            .setDescription(desc)
            .setFooter('Did you know? This bot was originally intended to only play "Around the World" by Daft Punk.');
        await interaction.reply({
            embeds: [ embed ],
            ephemeral: true
        })
    }
})