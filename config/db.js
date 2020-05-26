const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

  } catch (err) {
    
    console.log('MongoDB COnnected');

    // Exit process with failier
    process.exit(1);
  }
}

module.exports = connectDB;