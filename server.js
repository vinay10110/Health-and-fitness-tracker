const express = require('express');
const app = express();
const mongoose=require('mongoose');
app.use(express.json());
require('dotenv').config();
mongoose.connect(
    process.env.MONGO_URL 
  );
const PORT = 4000; 
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});