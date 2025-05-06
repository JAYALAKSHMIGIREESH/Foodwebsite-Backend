const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectCloudinary = require('./config/cloudinary');
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  'https://foodwebsite-frontend.vercel.app',
  'https://food-admin-peach.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Allow preflight (OPTIONS) requests for all routes
app.options('*', cors());

app.use(express.json());

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URI}`)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Connect to Cloudinary
connectCloudinary();

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Base route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
