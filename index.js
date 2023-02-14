const NLPCloudClient = require('nlpcloud');
const { Client, Intents } = require('discord.js');
require('dotenv').config();

// Load NLP Cloud token and Discord Bot token.
const nlpcloudToken = process.env.NLPCLOUD_TOKEN;
if (nlpcloudToken == null) {
    console.error('No NLP Cloud token received');
    process.exit();
}
const discordBotToken = process.env.DISCORD_BOT_TOKEN;
if (discordBotToken == null) {
    console.error('No Discord bot token received');
    process.exit();
}

// Initialize the NLP Cloud and Discord clients.
const nlpCloudClient = new NLPCloudClient('fast-gpt-j', nlpcloudToken, true)
const discordClient = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});


let history = [];
let charsCount = 0;

discordClient.on("messageCreate", function(message) {
    if (message.author.bot) return;

    (async () => {
        charsCount += `${message.content}`.length;

        // Send request to NLP Cloud.
        const response = await nlpCloudClient.chatbot(`${message.content}`, '', history);

        charsCount += `${response.data['response']}`.length;

        // Send response to Discord bot.
        message.reply(`${response.data['response']}`);

        // Add the request and response to the chat history.
        history.push({'input':`${message.content}`,'response':`${response.data['response']}`});

        // If the chat history is bigger than 1500 tokens, we remove the oldest elements from
        // the history. We consider that 1 token = 4 characters.
        // The theoretical GPT context limit is 2048 tokens but we choose 1500 tokens instead
        // in order to be safe since the tokens count is not perfectly accurate.
        while (charsCount > 1024 * 4) {
            charsCount -= history[0]['input'].length + history[0]['response'].length;
            history.shift();
        }
    })();
});


discordClient.login(discordBotToken);
