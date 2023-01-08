// global imports
import { 
    Client, 
    GatewayIntentBits, 
    Collection
} from 'discord.js';
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10' 
import dotenv from 'dotenv';
import fs from 'fs';

// local imports
import interactionCreate from './events/interactionCreate';
import ready from './events/ready';
import { Command } from './structures/Command';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ],
    allowedMentions: {
        repliedUser: false
    }
});

// create everything needed for commands
const json_commands: Collection<string, Command>[] = [];
const commandFiles: string[] = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.ts'));
const client_commands: Collection<string, Command> = new Collection();

// load commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client_commands.set(command.builder.name, command);
    json_commands.push(command.builder.toJSON());
    console.log(`Loaded ${command.builder.name}`);
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);
(async () => {
    try {
        await rest.put(Routes.applicationGuildCommands("887920232407109652", "868207679808614420"), { body: json_commands });
        // (client, guild)
    }
    catch (err) {
        console.log(err);
    }
})(); // what the fuck?

ready(client);
interactionCreate(client);
client.login(process.env.TOKEN);

export { client, client_commands, json_commands } // for my help command