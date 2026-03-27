const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); // 1. Path module import karein
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

// Body Parser Middleware
app.use(express.json());

// 2. STATIC FOLDER: Is line ki wajah se aap browser mein images dekh sakenge
// Example: http://localhost:5000/uploads/image.webp
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes ko connect karna
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



