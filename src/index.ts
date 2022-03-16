// Global imports
import { 
    Client, 
    Intents, 
    Collection, 
    Interaction, 
    Message
} from 'discord.js';
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9' 
import dotenv from 'dotenv';
import fs from 'fs';

// Local imports
import { CLIENT_ID, GUILD_ID } from '../config.json'

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

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN as string);
(async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: json_commands });
    }
    catch (err) {
        console.log(err);
    }
})();

client.on('ready', () => {
    client.user?.setActivity('/help', {
        type: 'LISTENING'
    });
    console.log('TimBot 909 status: Active')
});

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

client.on('messageCreate', async (message: Message) => {
    if (message.content.includes('hu tao') && !message.author.bot) {
        message.channel.send('you mean best girl?');
    }
})

client.login(process.env.TOKEN); 

export { client_commands, json_commands } // for my help command