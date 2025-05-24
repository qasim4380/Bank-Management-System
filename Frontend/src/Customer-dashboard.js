

// export default CustomerDashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomerDetails from './CustomerDetails';
import MenuCard from './MenuCard';

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null); // State to store customer data
  const navigate = useNavigate();
  const CustomerID = localStorage.getItem('CustomerID'); // Retrieve CustomerID from local storage

  useEffect(() => {
    if (!CustomerID) {
      alert('You need to log in first!');
      navigate('/login');
      return;
    }

    // Fetch customer details using the API endpoint
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5010/api/v1/customers/get/${CustomerID}`);
        if (response.data.success) {
          setCustomer(response.data.data); // Set the customer data from the API response
        } else {
          alert('No customer details found! Please log in again.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching customer details:', error);
        alert('Error fetching customer details');
        navigate('/login');
      }
    };

    fetchCustomerData();
  }, [CustomerID, navigate]);

  const navigateToService = (service) => {
    navigate(`/${service}`);
  };

  if (!customer) {
    return <div>Loading...</div>; // Show a loading state while setting customer data
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-[#3d2a1d] text-white p-8 text-center">
        <h1 className="text-4xl font-semibold">Welcome, {customer.FirstName} {customer.LastName}</h1>
        <p className="text-lg">Your personalized dashboard</p>
      </header>

      <div className="flex-1 p-8">
        {/* Customer Details Component */}
        <CustomerDetails customer={customer} />

        {/* Action Buttons */}
        <div className="mt-10">
          <h3 className="text-2xl text-[#3d2a1d] font-semibold mb-4">Actions</h3>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <MenuCard title="Deposit Amount" onClick={() => navigateToService('deposit')} />
            <MenuCard title="Withdraw Amount" onClick={() => navigateToService('withdraw')} />
            <MenuCard title="Apply for Loan" onClick={() => navigateToService('loan')} />
            <MenuCard title="Request ATM Card" onClick={() => navigateToService('request-atm')} />
            <MenuCard title="Report a Problem" onClick={() => navigateToService('report-problem')} />
            <MenuCard title="Update Account" onClick={() => navigateToService('updateAccount')} />
            <MenuCard title="Delete Account" onClick={() => navigateToService('deleteAccount')} />
            <MenuCard title="Send Money" onClick={() => navigateToService('createTransaction')} />
            <MenuCard title="Pay Money" onClick={() => navigateToService('payments')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
