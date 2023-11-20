
import React, { useState } from 'react';
import DataTable from './components/DataTable';
import data from '../public/data.json';

const CloseAccountModal = ({ isOpen, onClose, onSubmit, data, onChange }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Close Account</h2>
          <form>
            <div className="mb-2 mr-4">
              <label className="mr-4 text-sm text-gray-600">Email:</label>
              <input
                type="text"
                name="email"
                value={data.email}
                onChange={onChange}
                className="p-2 border border-gray-300"
              />
            </div>
            <div className="mb-2 flex items-center space-x-2 text-sm text-gray-600">
              <label>Want to file UAR:</label>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <label>
                  <input
                    type="radio"
                    name="wantToUAR"
                    value="Yes"
                    checked={data.wantToUAR === 'Yes'}
                    onChange={onChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="wantToUAR"
                    value="No"
                    checked={data.wantToUAR === 'No'}
                    onChange={onChange}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="mb-2 mr-4">
              <label className="mr-4 text-gray-600 text-sm">Reason:</label>
              <select
                name="reason"
                value={data.reason}
                onChange={onChange}
                className="p-2 border border-gray-300 text-gray-600 text-sm"
              >
                <option value="">Select a reason</option>
                <option value="Moving">Moving</option>
                <option value="Financial">Financial reasons</option>
            
              </select>
            </div>
            <div className="mb-2 mr-4">
              <label className="mr-4 text-gray-600 text-sm">Note:</label>
              <textarea
                name="note"
                value={data.note}
                onChange={onChange}
                className="p-2 border border-gray-300"
              />
            </div>
            <div className="mb-2 flex items-center space-x-2 text-sm text-gray-600">
              <label>Charge Closure Fee:</label>
              <div className="flex items-center space-x-2">
                <label>
                  <input
                    type="radio"
                    name="chargeClosureFee"
                    value="Yes"
                    checked={data.chargeClosureFee === 'Yes'}
                    onChange={onChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="chargeClosureFee"
                    value="No"
                    checked={data.chargeClosureFee === 'No'}
                    onChange={onChange}
                  />
                  No
                </label>
              </div>
            </div>
           
            <button type="button" onClick={onSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Close Account
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 ml-2 border rounded-md">
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
};

const App = () => {

  const [activeTab, setActiveTab] = useState('Pending');

  const [showCloseAccountForm, setShowCloseAccountForm] = useState(false);
  const [closeAccountData, setCloseAccountData] = useState({
    email: '',
    wantToUAR: 'No',
    reason: '',
    note: '',
    chargeClosureFee: 'No',
  });


  // Function to handle input changes in the close account form
  const handleCloseAccountInputChange = (event) => {
    const { name, value } = event.target;
    setCloseAccountData((prevData) => ({ ...prevData, [name]: value }));
  };

    // Function to handle close account form submission
    const handleAccountClosure = () => {
    
      console.log('Close Account Data:', closeAccountData);

      // Close the form and reset data
      setShowCloseAccountForm(false);
      setCloseAccountData({
        email: '',
        wantToUAR: 'No',
        reason: '',
        note: '',
        chargeClosureFee: 'No',
      });
    };


  const [view, setView] = useState('All'); // 'All', 'Pending', 'Completed'
  const [sortBy, setSortBy] = useState(null); // 'User', 'Risk level', 'Trigger reason', 'In queue for', 'Date added on', 'Previously reviewed'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTriggerReason, setSelectedTriggerReason] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('');

  const handleRiskLevelSelect = (option) => {
    setSelectedRiskLevel(option);
  };

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


      // Close Account Modal Handlers
      const handleCloseAccountModalOpen = () => {
        setShowCloseAccountForm(true);
      };
    
      const handleCloseAccountModalClose = () => {
        setShowCloseAccountForm(false);
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

  const handleSidebarItemClick = (tab) => {
    setActiveTab(tab);
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

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen  w-screen overflow: auto">

      {/* Mobile Hamburger Menu Button */}
      <button
        onClick={handleMobileMenuToggle}
        className="md:hidden absolute top-4 left-4 z-10"
      >
        ☰
      </button>

      {/* Left Sidebar/Nav */}
      <div className={`w-1/6 p-4 bg-gray-100 md:block ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="text-2xl font-bold mb-16 text-gray-400">[ Your Logo ]</div>
        <nav>
        <ul className="space-y-4">
            <li
              onClick={() => handleSidebarItemClick('Pending')}
              className={`cursor-pointer ${activeTab === 'Pending' ? 'text-blue-500' : ''}`}
            >
              Pending
            </li>
            <li
              onClick={() => handleSidebarItemClick('Completed')}
              className={`cursor-pointer ${activeTab === 'Completed' ? 'text-blue-500' : ''}`}
            >
              Completed
            </li>
            <li onClick={() => handleSidebarItemClick('Overview')} className={`cursor-pointer ${activeTab === 'Overview' ? 'text-blue-500' : ''}`}>
              Overview
            </li>
            <li onClick={() => handleSidebarItemClick('Onboarding')} className={`cursor-pointer ${activeTab === 'Onboarding' ? 'text-blue-500' : ''}`}>
              Onboarding
            </li>
            <li onClick={() => handleSidebarItemClick('Monitoring')} className={`cursor-pointer ${activeTab === 'Monitoring' ? 'text-blue-500' : ''}`}>
              Monitoring
            </li>
            <li onClick={() => handleSidebarItemClick('Flagging')} className={`cursor-pointer ${activeTab === 'Flagging' ? 'text-blue-500' : ''}`}>
              Flagging
            </li>
            <li onClick={() => handleSidebarItemClick('Source of Income')} className={`cursor-pointer ${activeTab === 'Source of Income' ? 'text-blue-500' : ''}`}>
              Source of Income
            </li>
            <li onClick={() => handleSidebarItemClick('UAR')} className={`cursor-pointer ${activeTab === 'UAR' ? 'text-blue-500' : ''}`}>
              UAR
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex items-center space-x-2">
            <img src="https://www.shutterstock.com/image-vector/profile-line-icon-user-outline-260nw-1283517448.jpg" alt="User Photo" className="w-8 h-8 rounded-full" />
            <div>
              <div className="text-sm font-semibold">John Doe</div>
              <div className="text-xs">john@example.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8"  onClick={closeMobileMenu}>
        <h1 className="text-2xl font-bold mb-4">Monitoring</h1>

        {/* Top Options */}
        <div className="flex items-center justify-between mb-4">
  {/* Left side */}
  <div className="flex items-center space-x-4">
    <div className={`cursor-pointer ${view === 'Pending' ? 'text-blue-500' : ''}`} onClick={() => setView('Pending')}>
      Pending
    </div>
    <div className={`cursor-pointer ${view === 'Completed' ? 'text-blue-500' : ''}`} onClick={() => setView('Completed')}>
      Completed
    </div>
  </div>

  {/* Right side */}
  <div className="flex items-center">
    {/* Close Account Button */}
    <button onClick={handleCloseAccountModalOpen} className="cursor-pointer text-red-600">
      Close Account
    </button>
  </div>
</div>


        <div className="mb-4 flex flex-col md:flex-row">
      {/* Search Bar */}
      <div className="mb-4 md:mr-4 ">
        <input
          type="text"
          placeholder="🔎Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded-md border-gray-300"
        />
      </div>

      {/* Sorting Buttons */}
      <div className="mb-4 relative inline-block text-left md:mr-4">
        <div>
          <button
            onClick={handleDropdownTriggerReasonToggle}
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {selectedTriggerReason || 'Trigger Reason'}
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
                {selectedRiskLevel || 'Risk Level'}
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

        {/* Close Account Modal */}
        <CloseAccountModal
          isOpen={showCloseAccountForm}
          onClose={handleCloseAccountModalClose}
          onSubmit={handleAccountClosure}
          data={closeAccountData}
          onChange={handleCloseAccountInputChange}
        />

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