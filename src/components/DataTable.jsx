// src/components/DataTable.jsx
import React from 'react';

const DataTable = ({ data }) => {
  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Risk Level</th>
            <th className="py-2 px-4 border-b">Trigger Reason</th>
            <th className="py-2 px-4 border-b">In Queue For</th>
            <th className="py-2 px-4 border-b">Date Added On</th>
            <th className="py-2 px-4 border-b">Previously Reviewed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{item.User}</td>
              <td className="py-2 px-4 border-b">{item["Risk level"]}</td>
              <td className="py-2 px-4 border-b">{item["Trigger reason"]}</td>
              <td className="py-2 px-4 border-b">{item["In queue for"]}</td>
              <td className="py-2 px-4 border-b">{item["Date added on"]}</td>
              <td className="py-2 px-4 border-b">{item["Previously reviewed"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
