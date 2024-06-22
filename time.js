const Vonage = require('nexmo');

// Initialize Vonage (Nexmo) client
const vonage = new Vonage({
    apiKey: '66d194fc',
    apiSecret: '',
});

// Function to send SMS
async function sendSMS(to, text) {
    try {
        const from = '+917989917138'; // Replace with your sender number or name

        // Sending SMS
        vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                console.error('Error sending SMS:', err);
            } else {
                if (responseData.messages[0].status === '0') {
                    console.log('SMS sent successfully:', responseData.messages[0]['message-id']);
                } else {
                    console.error(`SMS failed with error: ${responseData.messages[0]['error-text']}`);
                }
            }
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
}

// Example usage
const recipientNumber = '+919502237652'; // Replace with recipient's phone number
const messageText = 'Hello from Vonage (Nexmo)!'; // Replace with your message

sendSMS(recipientNumber, messageText);
