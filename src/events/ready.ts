import { ActivityType, Client } from "discord.js";

export default (client: Client): void => { 
    client.on('ready', () => {
        client.user?.setActivity('/help', {
            type: ActivityType.Listening
        });
        console.log('TimBot 909 status: Active')
    });
}