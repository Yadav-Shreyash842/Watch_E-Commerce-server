const express = require ("express");
const dotenv  = require ("dotenv");
const connectDB = require("./config/db.js");
const cors = require("cors")


dotenv.config();

connectDB();

const app = express();


app.use(cors());
app.use(express.json())

// Routes

app.use('/api/auth', require("./routes/authRoutes.js"));
app.use('/api/products', require ("./routes/productRoutes.js"));
app.use('/api/orders', require("./routes/orderRoutes.js"))

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});