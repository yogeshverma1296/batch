import React, { useState } from 'react';
import axios from 'axios';

const BatchForm = ({ onAdd }) => {
  const [batchYear, setBatchYear] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/batch/add', {
        batch_name: parseInt(batchYear),
      });

      if (res.data.status === 'success') {
        setBatchYear('');
        onAdd();
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="number"
        placeholder="Enter Batch Year"
        value={batchYear}
        onChange={(e) => setBatchYear(e.target.value)}
        required
      />
      <button type="submit">Add Batch</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default BatchForm;
