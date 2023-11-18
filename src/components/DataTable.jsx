// DataTable.jsx
import React from 'react';

const DataTable = ({ data, onSort, sortBy, sortOrder, columns }) => {
  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="py-2 px-4 border-b" onClick={() => onSort(column)}>
                {column} {sortBy === column && <span>{sortOrder === 'asc' ? '🔼' : '🔽'}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={index} className="py-2 px-4 border-b">
                  {item[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;