// backend/controllers/batchController.js
const Batch = require('../models/batch');
const Counter = require('../models/counter');

// Ensure counter exists
async function initCounter() {
  const counter = await Counter.findOne({ id: 'batch_id' });
  if (!counter) {
    await new Counter({ id: 'batch_id', seq: 0 }).save();
    console.log('Counter initialized');
  }
}

async function createBatch(req, res) {
  const { batch_name } = req.body;

  if (!batch_name || isNaN(batch_name)) {
    return res.status(400).json({ status: 'fail', message: 'Invalid batch year' });
  }

  try {
    // Prevent duplicate batch_name
    const exists = await Batch.findOne({ batch_name });
    if (exists) {
      return res.status(400).json({ status: 'fail', message: 'Batch year already exists' });
    }

    // Auto-increment batch_id
    const counter = await Counter.findOneAndUpdate(
      { id: 'batch_id' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const newBatch = new Batch({
      batch_id: counter.seq,
      batch_name
    });

    await newBatch.save();
    return res.status(201).json({ status: 'success', data: newBatch });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
async function getAllBatches(req, res) {
  try {
    const batches = await Batch.find().sort({ batch_id: 1 });
    res.json({ status: 'success', data: batches });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
// Update a batch
const updateBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const batch = await Batch.findByIdAndUpdate(id, updateData, { new: true });

    if (!batch) {
      return res.status(404).json({ status: 'fail', message: 'Batch not found' });
    }

    res.json({ status: 'success', data: batch });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Batch.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ status: 'fail', message: 'Batch not found' });
    }
    res.json({ status: 'success', message: 'Batch deleted' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createBatch,
  getAllBatches,
  updateBatch,
  deleteBatch,
  initCounter,
};
