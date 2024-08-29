const express = require('express');
const { rateLimiterMiddleware } = require('./rateLimiter');
const { addTaskToQueue } = require('./taskQueue');

const app = express();
app.use(express.json());

// Endpoint to handle task requests
app.post('/task', rateLimiterMiddleware, async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    await addTaskToQueue(user_id);
    res.status(200).json({ message: 'Task queued for processing' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
