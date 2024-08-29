const Queue = require('bull');
const { logTaskCompletion } = require('./taskLogger');

// Create a Bull queue instance
const taskQueue = new Queue('task_queue', {
    redis: {
        host: '127.0.0.1',
        port: 6379,
    },
});

// Process tasks from the queue
taskQueue.process(async (job, done) => {
    const { user_id } = job.data;
    await task(user_id);
    done();
});

// Add tasks to the queue
const addTaskToQueue = async (user_id) => {
    await taskQueue.add({ user_id });
};

// Define the task function
async function task(user_id) {
    console.log(`${user_id} - task completed at - ${Date.now()}`);
    await logTaskCompletion(user_id);
}

module.exports = { addTaskToQueue };
