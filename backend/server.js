// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const batchRoutes = require('./routes/batchRoutes');
const { initCounter } = require('./controllers/batchController');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/batch', batchRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ MongoDB Connected');
  await initCounter();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB Connection Error:', err));
