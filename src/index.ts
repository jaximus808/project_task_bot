import { Client, GatewayIntentBits } from 'discord.js';
import { COMMAND_DELIM } from './utils/consts';
import dotenv from 'dotenv';
import { HandleMessage } from './internal/discord-client/message_handler';

dotenv.config();

const command_delim = COMMAND_DELIM

// 1. Create a new Client instance with the intents you need
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,          // to register slash commands and receive interactions
    GatewayIntentBits.GuildMessages,   // to read messages in guilds (if you want)
    GatewayIntentBits.MessageContent,  // to access message content (if you want to respond to text commands)
  ],
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user?.tag}.`);
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(command_delim)) {
    //begin data flow
    //update to add SUPABASE
    const report = await HandleMessage(message)
    if (report.success) {
        message.channel.send(`${report.info}`)
    }
    else {
        message.channel.send(`ERROR: ${report.info}`)
    }
  }
});

(async () => {
//   await registerSlashCommands();
  client.login(process.env.DISCORD_TOKEN);
})();
