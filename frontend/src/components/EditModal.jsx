import React from 'react';

const EditModal = ({ show, data, onChange, onClose, onSubmit }) => {
  if (!show) return null;

  return (
    <div style={modalStyle}>
      <form onSubmit={onSubmit} style={modalContentStyle}>
        <h3>Edit Batch</h3>
        <input
          type="number"
          name="batch_name"
          value={data.batch_name}
          onChange={onChange}
          required
          placeholder="Year"
        />
        <input
          type="text"
          name="batch_user"
          value={data.batch_user}
          onChange={onChange}
          required
          placeholder="User"
        />
        <select
          name="batch_status"
          value={data.batch_status}
          onChange={onChange}
          required
        >
          <option value="0">Inactive</option>
          <option value="1">Active</option>
          <option value="2">Suspend</option>
        </select>
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

export default EditModal;