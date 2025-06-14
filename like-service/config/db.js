const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté à Like-Service');
  } catch (err) {
    console.error('Erreur MongoDB Like-Service:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
