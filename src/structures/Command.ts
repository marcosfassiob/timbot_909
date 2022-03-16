import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

/**
 * A global type for command run functions, 
 * because I'm not writing this in a parameter
 * 
 * @param {CommandInteraction} interaction
 */
type Callback = (interaction: CommandInteraction) => void;

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
    public data: SlashCommandBuilderWrapper;
    public run: Callback;
    
    /**
     * Default command constructor. Takes in a single object parameter with two fields:
     * one with a slash command builder to set up the slash command on Discord and
     * the run function that executes the command.
     * 
     * @param {SlashCommandBuilder} options.data 
     * @param {Callback} options.run
     */
    constructor(options: { data: SlashCommandBuilderWrapper, run: Callback }) {
        this.data = options.data;
        this.run = options.run;
    }
}

export { Callback, SlashCommandBuilderWrapper };