import { Client } from "discord.js";

export default (client: Client): void => { 
    client.on('ready', () => {
        client.user?.setActivity('/help', {
            type: 'LISTENING'
        });
        console.log('TimBot 909 status: Active')
    });
}