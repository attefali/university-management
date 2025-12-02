const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الرجاء إدخال اسم المقرر'],
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'الرجاء إدخال رمز المقرر'],
    unique: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  description: String,
  semester: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Course', courseSchema);
