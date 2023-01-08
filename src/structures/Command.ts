import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { CommandType } from "../util/CommandType";

/**
 * A temp fix to an unholy slash command builder return type
 */
type SlashCommandBuilderWrapper = SlashCommandBuilder 
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'> 
    | SlashCommandSubcommandsOnlyBuilder;

/**
 * A wrapper for a slash command builder and the function that runs the command.
 * I have no idea why and how this works but it does.
 * 
 * @author Marcos F (Tim Honks#0808)
 * @version 10/27/2021
 */
export class Command {
    public type: CommandType;
    public usage: string;
    public builder: SlashCommandBuilderWrapper;
    public run: (interaction: ChatInputCommandInteraction) => void;
    
    /**
     * Default command constructor. Takes in a single object parameter with three fields:
     * one with the metadata needed to identify the command, 
     * one with a slash command builder to set up the 
     * slash command on Discord and the run function that executes the command.
     * 
     * @param {type} options.type
     * @param {usage} options.usage
     * @param {SlashCommandBuilder} options.builder 
     * @param {(interaction: ChatInputCommandInteraction)} options.run
     */
    constructor(options: { 
        type: CommandType, 
        usage: string,
        builder: SlashCommandBuilderWrapper, 
        run: (interaction: ChatInputCommandInteraction) => void 
    }) {
        this.type = options.type;
        this.usage = options.usage;
        this.builder = options.builder;
        this.run = options.run;
    }
}