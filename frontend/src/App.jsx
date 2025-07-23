import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [batchYear, setBatchYear] = useState('');
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    _id: '',
    batch_id: '',
    batch_name: '',
    batch_user: '',
    batch_status: '',
    batch_update_date: '',
  });

  const fetchBatches = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/batch/all');
      if (res.data.status === 'success') {
        setBatches(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching batches:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/batch/add', {
        batch_name: parseInt(batchYear),
      });

      if (res.data.status === 'success') {
        setBatchYear('');
        fetchBatches();
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      try {
        await axios.delete(`http://localhost:5000/api/batch/delete/${id}`);
        fetchBatches();
      } catch (err) {
        alert('Failed to delete batch.');
      }
    }
  };

  const openEditModal = (batch) => {
    setEditData(batch);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/batch/update/${editData._id}`, editData);
      setShowEditModal(false);
      fetchBatches();
    } catch (err) {
      alert('Failed to update batch.');
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Add New Batch Year</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={batchYear}
          onChange={(e) => setBatchYear(e.target.value)}
          placeholder="Enter batch year"
          required
        />
        <button type="submit">Add Batch</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3 style={{ marginTop: '2rem' }}>All Batches</h3>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Batch</th>
            <th>User</th>
            <th>Status</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch._id}>
              <td>{batch.batch_id}</td>
              <td>{batch.batch_name}</td>
              <td>{batch.batch_user}</td>
              <td>{batch.batch_status}</td>
              <td>{new Date(batch.batch_update_date).toLocaleString()}</td>
              <td>
                <button onClick={() => openEditModal(batch)}>Edit</button>
                <button onClick={() => handleDelete(batch._id)} style={{ marginLeft: '5px' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal Overlay */}
      {showEditModal && (
        <div style={modalStyle}>
          <form onSubmit={handleEditSubmit} style={modalContentStyle}>
            <h3>Edit Batch</h3>
            <input
              type="number"
              name="batch_name"
              value={editData.batch_name}
              onChange={handleEditChange}
              required
              placeholder="Year"
            />
            <input
              type="text"
              name="batch_user"
              value={editData.batch_user}
              onChange={handleEditChange}
              required
              placeholder="User"
            />
            <select
              name="batch_status"
              value={editData.batch_status}
              onChange={handleEditChange}
              required
            >
              <option value="0">0 - Inactive</option>
              <option value="1">1 - Active</option>
              <option value="2">2 - Suspend</option>
            </select>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

export default App;
