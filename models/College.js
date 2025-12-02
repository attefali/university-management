const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الرجاء إدخال اسم الكلية'],
    unique: true,
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'الرجاء إدخال رمز الكلية'],
    unique: true,
  },
  description: String,
  dean: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  departments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('College', collegeSchema);
