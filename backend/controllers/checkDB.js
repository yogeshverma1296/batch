// backend/controllers/checkDB.js
const mongoose = require('mongoose');
const Batch = require('../models/batch');
const Counter = require('../models/counter');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ Connection Error:', err.message);
  }
}

async function initCounter() {
  const exists = await Counter.findOne({ id: 'batch_id' });
  if (!exists) {
    await new Counter({ id: 'batch_id', seq: 0 }).save();
    console.log('🧮 Counter initialized');
  }
}

async function createBatch(batch_name_input) {
  try {
    const existing = await Batch.findOne({ batch_name: batch_name_input });
    if (existing) {
      return { status: 'fail', message: 'Batch year already exists' };
    }

    const counter = await Counter.findOneAndUpdate(
      { id: 'batch_id' },
      { $inc: { seq: 1 } },
      { new: true }
    );

    const newBatch = new Batch({
      batch_id: counter.seq,
      batch_name: batch_name_input
    });

    await newBatch.save();
    return { status: 'success', data: newBatch };
  } catch (err) {
    return { status: 'error', message: err.message };
  }
}

module.exports = { connectDB, initCounter, createBatch };
