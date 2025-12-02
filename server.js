require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// ✅ الاتصال بـ MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// Routes
app.use('/api/users', require('./routes/users'));
// app.use('/api/colleges', require('./routes/colleges'));
// app.use('/api/departments', require('./routes/departments'));
// app.use('/api/courses', require('./routes/courses'));
// app.use('/api/employees', require('./routes/employees'));
// app.use('/api/students', require('./routes/students'));

// Test Route
app.get('/', (req, res) => {
  res.json({
    message: '✅ السيرفر يعمل بنجاح!',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/users/register',
        login: 'POST /api/users/login',
      },
      users: {
        getAll: 'GET /api/users',
        getOne: 'GET /api/users/:id',
        update: 'PUT /api/users/:id',
        delete: 'DELETE /api/users/:id',
      },
    },
  });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'حدث خطأ في السيرفر',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server يعمل على http://localhost:${PORT}`);
  console.log(`📚 University System API`);
});
