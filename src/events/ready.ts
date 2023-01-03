import { ActivityType, Client, Events } from "discord.js";

export default (client: Client): void => { 
    client.on(Events.ClientReady, () => {
        client.user?.setActivity('/help', {
            type: ActivityType.Listening
        });
        console.log(`${client.user?.username} is online!`)
    });
}