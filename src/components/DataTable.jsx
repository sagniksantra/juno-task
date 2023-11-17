// DataTable.jsx
import React from 'react';

const DataTable = ({ data, onSort, sortBy, sortOrder }) => {
  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b" onClick={() => onSort('User')}>
              User {sortBy === 'User' && <span>{sortOrder === 'asc' ? '🔼' : '🔽'}</span>}
            </th>
            <th className="py-2 px-4 border-b" onClick={() => onSort('Risk level')}>
              Risk Level {sortBy === 'Risk level' && <span>{sortOrder === 'asc' ? '🔼' : '🔽'}</span>}
            </th>
            <th className="py-2 px-4 border-b" onClick={() => onSort('Trigger reason')}>
              Trigger Reason {sortBy === 'Trigger reason' && <span>{sortOrder === 'asc' ? '🔼' : '🔽'}</span>}
            </th>
            <th className="py-2 px-4 border-b" onClick={() => onSort('In queue for')}>
              In Queue For {sortBy === 'In queue for' && <span>{sortOrder === 'asc' ? '🔼' : '🔽'}</span>}
            </th>
            <th className="py-2 px-4 border-b" onClick={() => onSort('Date added on')}>
              Date Added On {sortBy === 'Date added on' && <span>{sortOrder === 'asc' ? '🔼' : '🔽'}</span>}
            </th>
            <th className="py-2 px-4 border-b" onClick={() => onSort('Previously reviewed')}>
              Previously Reviewed {sortBy === 'Previously reviewed' && <span>{sortOrder === 'asc' ? '🔼' : '🔽'}</span>}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{item.User}</td>
              <td className="py-2 px-4 border-b">{item['Risk level']}</td>
              <td className="py-2 px-4 border-b">{item['Trigger reason']}</td>
              <td className="py-2 px-4 border-b">{item['In queue for']}</td>
              <td className="py-2 px-4 border-b">{item['Date added on']}</td>
              <td className="py-2 px-4 border-b">{item['Previously reviewed']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
