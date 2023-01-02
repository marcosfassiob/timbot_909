import { Interaction, Client } from "discord.js";
import { client_commands } from "..";

export default (client: Client): void => { 
    client.on('interactionCreate', async (interaction: Interaction) => {
        if (!interaction.isCommand()) return;
        const command: any = client_commands.get(interaction.commandName);
        
        try {
            await command.run(interaction);
        }
        catch (err) {
            console.log(err);
        }
    });
}