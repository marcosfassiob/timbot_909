// Global imports
import { 
    Client, 
    Intents, 
    Collection
} from 'discord.js';
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9' 
import dotenv from 'dotenv';
import fs from 'fs';

// Local imports
import interactionCreate from './events/interactionCreate';
import ready from './events/ready';

dotenv.config();

const client = new Client({ //need to figure out how to assign a property to an object
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
    allowedMentions: {
        repliedUser: false
    }
});

const json_commands: any[] = [];
const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.ts'));
const client_commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client_commands.set(command.data.name, command);
    json_commands.push(command.data.toJSON());
    console.log(`Loaded ${command.data.name}`);
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

export { client_commands, json_commands } // for my help command