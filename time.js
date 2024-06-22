const { exec } = require('child_process');
const pathToExecute = 'D:\\projects\\jpmc2\\nexmo-sms\\index.js'; // Replace with your actual path

// Fixed time in UTC (e.g., 5 days from now)
const fixedTime = new Date();
fixedTime.setDate(fixedTime.getDate() + 5); // Add 5 days
console.log('Fixed Time:', fixedTime.toISOString());

// Current time
const currentTime = new Date();
console.log('Current Time:', currentTime.toISOString());

// Compare current time with fixed time
if (currentTime.getTime() < fixedTime.getTime()) {
    // Execute path code
    exec(`node ${pathToExecute}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
} else {
    console.log('Current time is more than 5 days from the fixed time.');
}