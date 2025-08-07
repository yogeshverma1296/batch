// backend/routes/batchRoutes.js
const express = require('express');
const router = express.Router();
const {
  createBatch,
  getAllBatches,
  updateBatch,
  suspendBatch,
  restoreBatch,
  getAllSuspendedBatches, // ← Add this
  initCounter,
} = require('../controllers/batchController');

router.post('/add', createBatch);
router.get('/all', getAllBatches);
router.put('/update/:id', updateBatch);
router.delete('/suspend/:id', suspendBatch);     // 🛑 Soft delete
router.put('/restore/:id', restoreBatch);        // ♻️ Restore
router.get('/suspended/all', getAllSuspendedBatches);

module.exports = router;
