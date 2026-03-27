const { createClient } = require('redis'); // Ya const redis = require('redis');

// Railway par REDIS_URL variable use hoga
const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
    try {
        await client.connect();
        console.log("Redis Connected Successfully on Railway! ✅");
    } catch (err) {
        console.error("Redis Connection Failed:", err);
    }
};

connectRedis();

module.exports = client;