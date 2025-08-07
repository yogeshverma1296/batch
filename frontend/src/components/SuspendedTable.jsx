import React from 'react';
import { RotateCcw } from 'lucide-react';
import StatusBadge from './StatusBadge';

const SuspendedTable = ({ batches, onRestore }) => {
  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
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
              <button onClick={() => onRestore(batch._id)}><RotateCcw size={16} /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SuspendedTable;
