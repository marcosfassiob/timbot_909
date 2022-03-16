import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { Command } from "../structures/Command";

export = new Command({
    data: new SlashCommandBuilder()
        .setName('sort')
        .setDescription('Sorts a list of numbers (for personal use)')
        .addStringOption(option => option
            .setName('list_of_integers')
            .setDescription('the list of integers you want to sort')
            .setRequired(true)),
    run: async function (interaction: CommandInteraction) {
        //fetch string message and turn it into string list
        let message: string = interaction.options.getString('list_of_integers') as string;
        let list: string[] = message.split(" ");

        //turn list to number list
        let intList: number[] = [];
        for (let i = 0; i < list.length; i++) {
            intList[i] = parseInt(list[i]);
        }

        //filter any non-number element and sort list
        intList = intList.filter(index => {
            return !isNaN(index);
        }).sort((a: number, b: number) => {
            return a - b;
        })

        //return sorted list
        await interaction.reply({
            content: intList.toString().replace(/,/g, " ") || 'Please input a number.',
            ephemeral: true
        })
    }
})