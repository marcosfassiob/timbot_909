import { inlineCode, SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../structures/Command";
import { CommandType } from "../util/CommandType";

export = new Command({
    type: CommandType.Information,
    usage: "/ping",
    builder: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pong.'),
    run: async function(interaction: ChatInputCommandInteraction) {
        let time = new Date().valueOf();
        await interaction.reply("pong!").then(() => {
            time = new Date().valueOf() - time;
            interaction.editReply(`pong! ${inlineCode(`${time} ms`)}`)
        })
    }
})