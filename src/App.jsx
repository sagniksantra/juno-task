// App.jsx
import React, { useState } from 'react';
import DataTable from './components/DataTable';
import data from '../public/data.json';

const App = () => {
  const [view, setView] = useState('All'); // 'All', 'Pending', 'Completed'
  const [sortBy, setSortBy] = useState(null); // 'User', 'Risk level', 'Trigger reason', 'In queue for', 'Date added on', 'Previously reviewed'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTriggerReason, setSelectedTriggerReason] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('');

  const handleRiskLevelSelect = (option) => {
    setSelectedRiskLevel(option);
  };

  const [showCloseAccountForm, setShowCloseAccountForm] = useState(false);
  const [closeAccountData, setCloseAccountData] = useState({
    email: '',
    wantToUAR: 'No',
    reason: '',
    note: '',
    chargeClosureFee: 'No',
  });

  const [showDropdownTriggerReason, setShowDropdownTriggerReason] = useState(false);
  const [showDropdownRiskLevel, setShowDropdownRiskLevel] = useState(false);

  const handleDropdownSelect = (option, dropdownType) => {
    if (dropdownType === 'triggerReason') {
      setSelectedTriggerReason(option);
      setShowDropdownTriggerReason(false);
    } else if (dropdownType === 'riskLevel') {
      setSelectedRiskLevel(option);
      setShowDropdownRiskLevel(false);
    }
  };

  const handleAccountClosure = () => {
    console.log('Close Account Data:', closeAccountData);
    setShowCloseAccountForm(false);
    setCloseAccountData({
      email: '',
      wantToUAR: 'No',
      reason: '',
      note: '',
      chargeClosureFee: 'No',
    });
  };

  const getColumns = () => {
    if (view === 'Pending') {
      return ['User', 'Risk level', 'Trigger reason', 'In queue for', 'Date added on', 'Previously reviewed'];
    } else if (view === 'Completed') {
      return ['User', 'Risk level', 'Action reason', 'Time to close', 'Date added on', 'Action taken by'];
    } else {
      return ['User', 'Risk level', 'Trigger reason', 'In queue for', 'Date added on', 'Previously reviewed'];
    }
  };

  const filterData = () => {
    if (view === 'All') {
      return data;
    } else if (view === 'Pending') {
      return data.filter((item) => item['Status'] === 'Pending');
    } else if (view === 'Completed') {
      return data.filter((item) => item['Status'] === 'Completed');
    }
  };

  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleDropdownTriggerReasonToggle = () => {
    setShowDropdownTriggerReason((prev) => !prev);
  };

  const handleDropdownRiskLevelToggle = () => {
    setShowDropdownRiskLevel((prev) => !prev);
  };

  const handleCloseAccountFormToggle = () => {
    setShowCloseAccountForm((prev) => !prev);
  };

  const handleCloseAccountInputChange = (event) => {
    const { name, value } = event.target;
    setCloseAccountData((prevData) => ({ ...prevData, [name]: value }));
  };

  const dropdownOptionsTriggerReason = ['FIFO', 'IP Change'];
  const dropdownOptionsRiskLevel = ['Low', 'Medium', 'High'];

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
        return item['Risk level'].toLowerCase() === selectedRiskLevel.toLowerCase();
      }
      return true;
    })
    .sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      const order = sortOrder === 'asc' ? 1 : -1;

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
        <div className="text-2xl font-bold mb-4">Your Logo</div>
        <nav>
          <ul className="space-y-2">
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
        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex items-center space-x-2">
            <img src="path-to-your-user-photo.jpg" alt="User Photo" className="w-8 h-8 rounded-full" />
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
          <div className="relative inline-block text-left">
            <div>
              <button
                onClick={handleDropdownTriggerReasonToggle}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {selectedTriggerReason || 'Select Trigger Reason'}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {showDropdownTriggerReason && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {dropdownOptionsTriggerReason.map((option) => (
                    <div
                      key={option}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={() => handleDropdownSelect(option, 'triggerReason')}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative inline-block text-left">
            <div>
              <button
                onClick={handleDropdownRiskLevelToggle}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {selectedRiskLevel || 'Select Risk Level'}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {showDropdownRiskLevel && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {dropdownOptionsRiskLevel.map((option) => (
                    <div
                      key={option}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={() => handleDropdownSelect(option, 'riskLevel')}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Close Account Button */}
        <div className="mb-4">
          <button onClick={handleCloseAccountFormToggle} className="cursor-pointer text-blue-500">
            Close Account
          </button>
        </div>

        {/* Close Account Form */}
        {showCloseAccountForm && (
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Close Account Form</h2>
            <form>
              <div className="mb-2">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={closeAccountData.email}
                  onChange={handleCloseAccountInputChange}
                  className="p-2 border border-gray-300"
                />
              </div>
              <div className="mb-2">
                <label>Want to file UAR:</label>
                <div className="flex items-center space-x-2">
                  <label>
                    <input
                      type="radio"
                      name="wantToUAR"
                      value="Yes"
                      checked={closeAccountData.wantToUAR === 'Yes'}
                      onChange={handleCloseAccountInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="wantToUAR"
                      value="No"
                      checked={closeAccountData.wantToUAR === 'No'}
                      onChange={handleCloseAccountInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
              {/* Add other form fields (Reason, Note, Charge Closure Fee) as needed */}
              {/* ... */}
              <button type="button" onClick={handleAccountClosure} className="px-4 py-2 bg-blue-500 text-white">
                Close Account
              </button>
              <button type="button" className="px-4 py-2 ml-2 border" onClick={handleCloseAccountFormToggle}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Table Headers with Sorting Arrows */}
        <DataTable
          data={filteredAndSortedData}
          onSort={handleSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
          columns={getColumns()}
        />
      </div>
    </div>
  );
};

export default App;
