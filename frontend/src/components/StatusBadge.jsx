import React from 'react';

const StatusBadge = ({ status }) => {
  switch (parseInt(status)) {
    case 0:
      return <span style={{ color: 'gray' }}>Inactive</span>;
    case 1:
      return <span style={{ color: 'green' }}>Active</span>;
    case 2:
      return <span style={{ color: 'orange' }}>Suspended</span>;
    default:
      return <span>Unknown</span>;
  }
};

export default StatusBadge;
