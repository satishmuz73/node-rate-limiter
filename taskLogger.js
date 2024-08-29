const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'taskLog.txt');

// Function to log task completion
const logTaskCompletion = async (user_id) => {
    const logMessage = `${user_id} - task completed at - ${Date.now()}\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error logging task completion:', err);
        }
    });
};

module.exports = { logTaskCompletion };
