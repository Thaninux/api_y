require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');


const app = express();
app.use(express.json());

connectDB();

const likeRoutes = require('./routes/like');
app.use('/api/likes', likeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Like-Service on port ${PORT}`));
