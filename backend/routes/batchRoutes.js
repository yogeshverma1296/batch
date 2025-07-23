// backend/routes/batchRoutes.js
const express = require('express');
const router = express.Router();
const {
  createBatch,
  getAllBatches,
  updateBatch,
  deleteBatch,
} = require('../controllers/batchController');

router.post('/add', createBatch);
router.get('/all', getAllBatches);
router.put('/update/:id', updateBatch);   // 🆕 Update route
router.delete('/delete/:id', deleteBatch); // 🆕 Delete route

module.exports = router;
