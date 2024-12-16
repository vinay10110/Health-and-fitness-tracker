const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: `${process.env.HOST_ADDRESS}`,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
  credentials:true
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.HOST_ADDRESS}`);
  next();
});


const authRoute = require('./routes/auth');
const healthRoute = require('./routes/healthTracker');

app.use('/auth', authRoute);
app.use('/health', healthRoute);



mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
