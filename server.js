const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors'); // 1. CORS import kiya
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

// 2. Middlewares (CORS ko sab se upar rakha hai taake har request allow ho)
app.use(cors()); 
app.use(express.json());

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. Root Route
app.get('/', (req, res) => {
  res.send('API is running successfully with CORS enabled! ✅');
});

// 4. User Routes
app.use('/api/users', userRoutes);

// 5. Server Port Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});