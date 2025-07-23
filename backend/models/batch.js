// backend/models/batch.js
const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batch_id: { type: Number, unique: true },
  batch_name: { type: Number, required: true, unique: true },
  batch_user: { type: String, default: 'admin' },
  batch_update_date: { type: Date, default: Date.now },
  batch_status: { type: Number, enum: [0, 1, 2], default: 1 }
});

module.exports = mongoose.model('Batch', batchSchema);
