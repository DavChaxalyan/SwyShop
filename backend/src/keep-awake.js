const https = require('https'); 

const url1 = 'https://swyshop.onrender.com/ping'; 
const url2 = 'https://todo-app-yuun.onrender.com/ping'; 

function sendPing(url) {
  console.log(`[${new Date().toISOString()}] Sending ping...`);

  https.get(url, (res) => {
    console.log(`[${new Date().toISOString()}] Server responded with status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Error while pinging: ${err.message}`);
  });
}

sendPing(url1);
sendPing(url2);

setInterval(sendPing, 14 * 60 * 1000);
