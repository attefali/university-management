const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الرجاء إدخال اسم القسم'],
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'الرجاء إدخال رمز القسم'],
    unique: true,
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true,
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Department', departmentSchema);
