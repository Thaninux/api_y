require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const postRoutes = require('./routes/post');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());

connectDB();

app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Post-service démarré sur le port ${PORT}`);
});
