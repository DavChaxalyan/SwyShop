const https = require('https');
const schedule = require('node-schedule');

const url1 = 'https://swyshop.onrender.com/ping';
const url2 = 'https://todo-app-yuun.onrender.com/ping';

function sendPing(url) {
  console.log(`[${new Date().toISOString()}] Sending ping to ${url}...`);

  https.get(url, (res) => {
    console.log(`[${new Date().toISOString()}] Server at ${url} responded with status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Error while pinging ${url}: ${err.message}`);
  });
}

schedule.scheduleJob('0,14,28,42,56 * * * *', () => {
  sendPing(url1);
  sendPing(url2);
});

console.log('Scheduled pings every 14 minutes to keep the server awake!');
