const express = require ("express");
const dotenv  = require ("dotenv");
const connectDB = require("./config/db.js");
const cors = require("cors")


dotenv.config();

connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json())

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Watch E-commerce API is running', status: 'OK' });
});

// Routes
app.use('/api/auth', require("./routes/authRoutes.js"));
app.use('/api/products', require ("./routes/productRoutes.js"));
app.use('/api/orders', require("./routes/orderRoutes.js"))

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});