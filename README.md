# Node.js Task Queueing with Rate Limiting

## Setup

1. **Install Dependencies**:
    ```bash
    npm install
    ```

2. **Start Redis**:
    Make sure Redis is running on your machine. You can start Redis using:
    ```bash
    redis-server
    ```

3. **Run the Application**:
    Start the Node.js application with PM2 for clustering:
    ```bash
    pm2 start index.js -i 2 --name "node-rate-limiter-cluster"
    ```

4. **API Endpoint**:
    - **POST /task**
      - Body: JSON `{ "user_id": "123" }`
      - This endpoint queues a task for the user and processes it according to the rate limit.

5. **Task Logs**:
    Task completions are logged in the `taskLog.txt` file in the root directory.

## Testing

- Use a tool like `Postman` to send POST requests to the `/task` endpoint.
- Check the `taskLog.txt` file to see logged tasks.
- Monitor PM2 for process management:
    ```bash
    pm2 list
    ```

## Notes

- No requests are dropped; they are queued and processed according to the rate limit.
- Ensure that the environment variables are correctly configured, especially if deploying to production.
