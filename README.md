# nlpcloud GPT Discord Chatbot

Get API Token from nlpcloud: https://nlpcloud.com/home/token

Create a discord bot and get the token: https://discord.com/developers/applications
The bot just needs basic permissions to read/send messages

Note: you must use the discord reply feature when talking to the bot! (hover over a message and click the reply arrow)

enter both tokens into .env (example at example.env file)

## How to start
```
npm install

node index.js
```

## Systemd service

```
sudo nano /etc/systemd/system/chatbot.service
```
```
[Unit]
Description=chatbot

[Service]
Type=simple
Restart=always
User=user
Group=user
WorkingDirectory=/home/user/chatbot
ExecStart=/usr/bin/node /home/user/chatbot/index.js

[Install]
WantedBy=multi-user.target
```
replace the User/Group with your user and change the WorkingDirectory and ExecStart to your location

Credits: https://nlpcloud.com/build-gpt-j-gpt-neox-discord-chatbot-with-nlpcloud.html
