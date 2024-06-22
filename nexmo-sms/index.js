require('dotenv').config();
const { Vonage } = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET
});

const from = 'Vonage';
const to = '+919502237652'; // Replace with recipient's phone number
const text = 'Hello from Vonage';

async function sendSMS() {
  try {
    const response = await vonage.sms.send({ to, from, text });
    if (response.messages[0].status === "0") {
      console.log("Message sent successfully.");
    } else {
      console.log(`Message failed with error: ${response.messages[0]['error-text']}`);
    }
  } catch (err) {
    console.error(err);
  }
}

sendSMS();