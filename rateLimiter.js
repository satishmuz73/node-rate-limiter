const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('redis');

// Create a Redis client
const redisClient = Redis.createClient();

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: 20, // 20 tasks per minute
    duration: 60, // Per minute
    keyPrefix: 'rate_limiter',
    blockDuration: 1, // Block for 1 second if the rate limit is exceeded
});

const rateLimiterMiddleware = async (req, res, next) => {
    const { user_id } = req.body;

    try {
        await rateLimiter.consume(user_id, 1); // Consume 1 point per request
        next();
    } catch (err) {
        if (err.msBeforeNext) {
            res.set('Retry-After', String(Math.ceil(err.msBeforeNext / 1000)));
            return res.status(429).json({ error: 'Rate limit exceeded, try again later' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { rateLimiterMiddleware };
