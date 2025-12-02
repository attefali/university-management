require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB متصل بنجاح!`);
    console.log(`🔗 Host: ${conn.connection.host}`);
    
    return conn;
  } catch (error) {
    console.error(`❌ خطأ في الاتصال: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
