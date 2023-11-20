// DataTable.jsx
import React from 'react';

const DataTable = ({ data, onSort, sortBy, sortOrder, columns }) => {
  return (
    <div className="container mx-auto mt-8 rounded-md">
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="py-2 px-4 border-b bg-gray-100" onClick={() => onSort(column)}>
                {column} {sortBy === column && <span>{sortOrder === 'asc' ? '🔼' : '🔽'}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={`py-2 px-4 border-b text-sm text-center ${
                    column === 'Risk level' &&
                    (item[column] === 'high'
                      ? 'text-red-700'
                      : item[column] === 'medium'
                      ? 'text-orange-500'
                      : item[column] === 'low'
                      ? 'text-green-700'
                      : '')
                  }`}
                >
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
