// App.jsx
import React, { useState } from 'react';
import DataTable from './components/DataTable';
import data from '../public/data.json';

function App() {
  const [view, setView] = useState('All'); // 'All', 'Pending', 'Completed'
  const [sortBy, setSortBy] = useState(null); // 'User', 'Risk level', 'Trigger reason', 'In queue for', 'Date added on', 'Previously reviewed'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const [searchTerm, setSearchTerm] = useState('');
  const [showTriggerReasonModal, setShowTriggerReasonModal] = useState(false);
  const [showRiskLevelModal, setShowRiskLevelModal] = useState(false);
  const [selectedTriggerReason, setSelectedTriggerReason] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('');

  // Function to filter data based on the selected view
  const filterData = () => {
    if (view === 'All') {
      return data;
    } else if (view === 'Pending') {
      return data.filter((item) => item['Status'] === 'Pending');
    } else if (view === 'Completed') {
      return data.filter((item) => item['Status'] === 'Completed');
    }
  };

  // Function to handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle Trigger Reason selection
  const handleTriggerReasonSelect = (option) => {
    setShowTriggerReasonModal(false);
    setSelectedTriggerReason(option);
  };

  // Function to handle Risk Level selection
  const handleRiskLevelSelect = (option) => {
    setShowRiskLevelModal(false);
    setSelectedRiskLevel(option);
  };

  // Function to handle sorting
  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Filtered, sorted, and searched data
  const filteredAndSortedData = filterData()
    .filter(
      (item) =>
        item['User'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item['Trigger reason'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item['Risk level'].toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => {
      if (selectedTriggerReason) {
        return item['Trigger reason'] === selectedTriggerReason;
      }
      return true;
    })
    .filter((item) => {
      if (selectedRiskLevel) {
        return item['Risk level'] === selectedRiskLevel;
      }
      return true;
    })
    .sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      const order = sortOrder === 'asc' ? 1 : -1;

      // Handle string or number comparison
      if (typeof valueA === 'string' || typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * order;
      } else {
        return (valueA - valueB) * order;
      }
    });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar/Nav */}
      <div className="w-1/6 p-4 bg-gray-800 text-white">
        {/* Logo */}
        <div className="text-2xl font-bold mb-4">Your Logo</div>

        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-2">
            <li onClick={() => setView('All')}>All</li>
            <li onClick={() => setView('Pending')}>Pending</li>
            <li onClick={() => setView('Completed')}>Completed</li>
            <li>Overview</li>
            <li>Onboarding</li>
            <li>Monitoring</li>
            <li>Flagging</li>
            <li>Source of Income</li>
            <li>UAR</li>
          </ul>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex items-center space-x-2">
            {/* User Photo */}
            <img src="path-to-your-user-photo.jpg" alt="User Photo" className="w-8 h-8 rounded-full" />
            {/* User Name and Email */}
            <div>
              <div className="text-sm font-semibold">John Doe</div>
              <div className="text-xs">john@example.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Data Table</h1>

        {/* Top Options */}
        <div className="flex items-center space-x-4 mb-4">
          <div className={`cursor-pointer ${view === 'All' ? 'text-blue-500' : ''}`} onClick={() => setView('All')}>
            All
          </div>
          <div className={`cursor-pointer ${view === 'Pending' ? 'text-blue-500' : ''}`} onClick={() => setView('Pending')}>
            Pending
          </div>
          <div className={`cursor-pointer ${view === 'Completed' ? 'text-blue-500' : ''}`} onClick={() => setView('Completed')}>
            Completed
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300"
          />
        </div>

        {/* Sorting Buttons */}
        <div className="mb-4">
          <button onClick={() => setShowTriggerReasonModal(true)} className="px-2 py-1 mr-2 bg-gray-300 hover:bg-gray-400">
            Trigger Reason
          </button>
          <button onClick={() => setShowRiskLevelModal(true)} className="px-2 py-1 bg-gray-300 hover:bg-gray-400">
            Risk Level
          </button>
        </div>

        {/* Trigger Reason Modal */}
        {showTriggerReasonModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-4 rounded">
              <div className="text-lg font-semibold mb-2">Select Trigger Reason</div>
              <ul className="space-y-2">
                <li onClick={() => handleTriggerReasonSelect('FIFO')}>FIFO</li>
                <li onClick={() => handleTriggerReasonSelect('IP Change')}>IP Change</li>
              </ul>
              <button onClick={() => setShowTriggerReasonModal(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Risk Level Modal */}
        {showRiskLevelModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-4 rounded">
              <div className="text-lg font-semibold mb-2">Select Risk Level</div>
              <ul className="space-y-2">
                <li onClick={() => handleRiskLevelSelect('low')}>Low</li>
                <li onClick={() => handleRiskLevelSelect('medium')}>Medium</li>
                <li onClick={() => handleRiskLevelSelect('high')}>High</li>
              </ul>
              <button onClick={() => setShowRiskLevelModal(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Table Headers with Sorting Arrows */}
        <DataTable data={filteredAndSortedData} onSort={handleSort} sortBy={sortBy} sortOrder={sortOrder} />
      </div>
    </div>
  );
}

export default App;
