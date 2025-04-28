const https = require('https'); 

const url = 'https://swyshop.onrender.com/ping'; 

function sendPing() {
  console.log(`[${new Date().toISOString()}] Sending ping...`);

  https.get(url, (res) => {
    console.log(`[${new Date().toISOString()}] Server responded with status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Error while pinging: ${err.message}`);
  });
}

sendPing();

setInterval(sendPing, 14 * 60 * 1000);
