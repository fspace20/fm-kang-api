'use strict';

const got = require('got');
const TelegramBot = require('node-telegram-bot-api');

// set telegram bot
const token = require('./bot.config.json').TOKEN;
const bot = new TelegramBot(token);
const channelId = '@fm_kang_bot';
const chatId = bot.getChat(channelId).id;


module.exports.crawler = (event, context, callback) => {
  let result;

  // get date info
  var today = new Date();
  var tdYmd = dateToYmd(today);
  console.log('function "${context.functionName}" starts at ${today}');

  const url = 'http://www.mofa.go.kr/minister/pgm/m_20032/uss/schedule/schedule.do'
  const FormData = require('form-data');
  const form = new FormData();
   
  form.append('type', 'move');
  form.append('tdDate', tdYmd);
  form.append('fstweek', tdYmd);
   
  console.log('POST:' + url);
  got.post(url, {
      body: form
  }).then(response => { 
    result = response.body;
    console.log(result);
  }).then(() => {
    console.log('THEN');

    // get today schedule
    if(result != undefined){
      // parse schedule keys
      var obj = JSON.parse(result);
      var keys = Object.keys(obj);
      for(var i = 0; i < keys.length; i++){
        console.log('KEY:' + keys[i]);
      }

      // parse today schedule
      var daySched = '오늘 일정이 없습니다.';
      var dayScheds = obj[keys[2]];
      for (var i = 0; i < dayScheds.length; i++) {
        if(i == 0){
          daySched = '';
          console.log('SCHED[0]:' + dayScheds[i]);
        }
        daySched += schedToTxt(dayScheds[i]);
      }

      // send schedule message
      var title = "[장관일정] " + tdYmd.substr(0,4) 
                + "-" + tdYmd.substr(4,2) 
                + "-" + tdYmd.substr(6,2) 
                + "\n";
      var msg = title + daySched;
      bot.sendMessage(channelId, msg);
    }
  }).catch(error => {
    console.log('ERROR:' + error);
  });
    
  // set HTTP response
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