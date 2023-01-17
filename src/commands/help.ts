import { SlashCommandBuilder, EmbedBuilder, RGBTuple, inlineCode } from "@discordjs/builders";
import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import { client, client_commands } from "..";
import { Command } from "../structures/Command";
import { CommandType } from "../util/CommandType";
import { embedColorCode, embedErrorCode } from "../../config.json"

export = new Command({
    type: CommandType.Information,
    usage: "/help\n/help [command]",
    builder: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Returns a list of commands")
        .addStringOption((option) => option
            .setName("command")
            .setDescription("command you need help with")),
    run: async (interaction: ChatInputCommandInteraction) => {

        const entry = interaction.options.getString("command")

        if (entry !== null) {

            const command: Command | undefined = client_commands.get(entry)

            if (typeof command === "undefined") {
                const embed = new EmbedBuilder()
                    .setColor(embedErrorCode as RGBTuple)
                    .setDescription("❌ We couldn't find what you were looking for.")

                return await interaction.reply({
                    embeds: [ embed ]
                })
            }

            // default perms or whatever perms needed 
            const bitfield: bigint = BigInt(command?.builder.default_member_permissions || PermissionsBitField.Default) 

            let perms: string = new PermissionsBitField(bitfield).toArray().toString()
            if (bitfield === PermissionsBitField.Default) {
                perms = "None";
            }
            
            // TODO create embed showing name, desc, usage, required permissions and maybe examples?
            const name: string = command.builder.name;
            const desc: string = command.builder.description;
            const usage: string = command.usage;
            
            const embed = new EmbedBuilder()
                .setColor(embedColorCode as RGBTuple)
                .setTitle(`Command: /${name}`)
                .addFields({
                    name: "Required permissions:",
                    value: perms
                }, 
                {
                    name: "Usage:",
                    value: usage
                })
                .setFooter({ text: "<> for required entries, [] for optional entries" })

            return await interaction.reply({
                embeds: [ embed ]
            });
        }
        else {
            // MAKE SURE TO UPDATE THIS WHEN ADDING NEW ENUMS
            let infoString: string = "";
            let miscString: string = "";
            let modString: string = "";

            for (const cmd of client_commands) {
                if (cmd[1].type === CommandType.Information) {
                    infoString += inlineCode(cmd[1].builder.name) + " ";
                }
                else if (cmd[1].type === CommandType.Miscellaneous) {
                    miscString += inlineCode(cmd[1].builder.name) + " ";
                }
                else {
                    modString += inlineCode(cmd[1].builder.name) + " ";
                }
            }

            const embed = new EmbedBuilder()
                .setTitle(`List of commands for ${client.user?.username || "this bot"}`)
                .setColor(embedColorCode as RGBTuple)
                .setDescription("Type `/` to get started!")
                .addFields({
                    name: "ℹ Information commands",
                    value: infoString || "N/A"
                },
                {
                    name: "🔨 Moderation commands",
                    value: modString || "N/A"
                },
                {
                    name: "⚡ Miscellaneous commands",
                    value: miscString || "N/A"
                })
                .setFooter({ text: `Total commands: ${client_commands.size}`})

            return await interaction.reply({
                embeds: [ embed ]
            })
        }
    }
})