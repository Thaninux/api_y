const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté au post-service');
  } catch (err) {
    console.error('Erreur de connexion MongoDB post-service :', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
