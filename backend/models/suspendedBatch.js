// backend/models/suspendedBatch.js
const mongoose = require('mongoose');

const suspendedBatchSchema = new mongoose.Schema({
  batch_id: { type: Number },
  batch_name: { type: Number },
  batch_user: { type: String },
  batch_update_date: { type: Date },
  batch_status: { type: Number }
});

module.exports = mongoose.model('SuspendedBatch', suspendedBatchSchema);
