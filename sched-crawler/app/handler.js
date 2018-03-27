'use strict';

const got = require('got');
const TelegramBot = require('node-telegram-bot-api');

// set telegram bot
const token = require('./bot.config.json').TOKEN;
const bot = new TelegramBot(token);
const channelId = '@fm_kang_bot';
const chatId = bot.getChat(channelId).id;


module.exports.crawler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};