require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');


// connection to the database
connectDB();


// Middleware
app.use(express.json());

app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Auth-service en ligne sur le port ${PORT}`);
});