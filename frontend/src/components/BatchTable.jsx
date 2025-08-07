import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

const BatchTable = ({ batches, onEdit, onSuspend }) => {
  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', marginBottom: '30px' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Year</th>
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
            <td><StatusBadge status={batch.batch_status} /></td>
            <td>{new Date(batch.batch_update_date).toLocaleString()}</td>
            <td>
              <button onClick={() => onEdit(batch)}><Pencil size={16} /></button>
              <button onClick={() => onSuspend(batch._id)} style={{ marginLeft: '5px' }}><Trash2 size={16} /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BatchTable;
