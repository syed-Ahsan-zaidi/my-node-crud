const client = require('../redisClient');
const pool = require('../config/db');
 // Redis client import karein

const cacheKey = 'users_list';

// 1. Saare users dekhna (With Caching)
const getAllUsers = async (req, res) => {
    try {
        // Redis mein check karein
        const cachedData = await client.get(cacheKey);
        
        if (cachedData) {
            console.log("Returning from Cache... 🚀");
            return res.status(200).json(JSON.parse(cachedData));
        }

        // Agar cache miss ho toh DB se lein
        console.log("Fetching from Database... 🐢");
        const result = await pool.query('SELECT * FROM users ORDER BY id ASC');

        // Redis mein save karein (e.g. 1 hour ke liye)
        await client.setEx(cacheKey, 3600, JSON.stringify(result.rows));

        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Naya user banana (Clear Cache)
const createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );

        // Naya user aaya hai, purana cache delete kar dein
        await client.del(cacheKey);
        console.log("Cache Cleared after Creation! 🧹");

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. User UPDATE karna (Clear Cache)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3',
            [name, email, id]
        );

        // Data update hua hai, cache clear karein
        await client.del(cacheKey);
        console.log("Cache Cleared after Update! 🧹");

        res.status(200).json({ message: "User updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. User delete karna (Clear Cache)
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);

        // User delete hua hai, cache clear karein
        await client.del(cacheKey);
        console.log("Cache Cleared after Deletion! 🧹");

        res.status(200).send(`User deleted with ID: ${id}`);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };