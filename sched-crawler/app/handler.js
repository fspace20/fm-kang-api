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
}

function dateToYmd(dt){
  var year = dt.getFullYear();
  var month = dt.getMonth()+1;
  var day = dt.getDate();

  var yyyy = '' + year;
  var mm = (month > 9 ? '' : '0') + month;
  var dd = (day > 9 ? '' : '0') + day;
  
  return yyyy + mm + dd;
}

function schedToTxt(sched){
  var txt = ' ' + sched['schDate'].substr(8,2)
          + ':' + sched['schDate'].substr(10,2)
          + ' ' + sched['title']
          + ' (' + sched['place'] + ')'
          + '\n';

  return txt;
}