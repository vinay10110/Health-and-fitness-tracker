const express = require('express');
const app = express();
const mongoose=require('mongoose');
const cors=require('cors')
app.use(express.json());
require('dotenv').config();
const authRoute=require('./routes/auth');
const healthRoute=require('./routes/healthTracker');
app.use('/auth',authRoute);
app.use('/health',healthRoute);
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
  credentials:true
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
})
mongoose.connect(
    process.env.MONGO_URL 
  );
  
const PORT = 4000; 
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});