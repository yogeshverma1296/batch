// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BatchForm from './components/BatchForm';
import BatchTable from './components/BatchTable';
import EditModal from './components/EditModal';
import SuspendedTable from './components/SuspendedTable';

function App() {
  const [batches, setBatches] = useState([]);
  const [suspendedBatches, setSuspendedBatches] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});

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

  const fetchSuspended = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/batch/suspended/all');
      if (res.data.status === 'success') {
        setSuspendedBatches(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching suspended:', err);
    }
  };

  const handleEdit = (batch) => {
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
      alert('Failed to update batch');
    }
  };

  const handleSuspend = async (id) => {
    if (window.confirm('Suspend this batch?')) {
      try {
        await axios.delete(`http://localhost:5000/api/batch/suspend/${id}`);
        fetchBatches();
        fetchSuspended();
      } catch (err) {
        alert('Failed to suspend batch');
      }
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/batch/restore/${id}`);
      fetchBatches();
      fetchSuspended();
    } catch (err) {
      alert('Failed to restore batch');
    }
  };

  useEffect(() => {
    fetchBatches();
    fetchSuspended();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Batch Management</h2>
      <BatchForm onAdd={() => fetchBatches()} />
      <h3>Active Batches</h3>
      <BatchTable batches={batches} onEdit={handleEdit} onSuspend={handleSuspend} />

      <h3>Suspended Batches</h3>
      <SuspendedTable batches={suspendedBatches} onRestore={handleRestore} />

      <EditModal
        show={showEditModal}
        data={editData}
        onChange={handleEditChange}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
}

export default App;
