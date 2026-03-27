const { createClient } = require('redis');

// Default connect karega localhost:6379 par (jo Memurai use kar raha hai)
const client = createClient();

client.on('error', (err) => console.log('Redis Client Error:', err));

const connectRedis = async () => {
    try {
        await client.connect();
        console.log("Redis (Memurai) Connected Successfully! ✅");
    } catch (err) {
        console.error("Redis Connection Failed:", err);
    }
};

connectRedis();

module.exports = client;