// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './CustomerDetails.css';

// const CustomerDetails = () => {
//   const [customer, setCustomer] = useState(null); // State to store the customer data
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [error, setError] = useState(null); // State for error handling

//   useEffect(() => {
//     const fetchCustomerDetails = async () => {
//       const CustomerID = localStorage.getItem('CustomerID'); // Retrieve the logged-in customer's ID

//       if (!CustomerID) {
//         setError('You need to log in first!');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5010/api/v1/customers/get/${CustomerID}`);
//         console.log('Customer details response:', response.data);

//         if (response.data.success) {
//           setCustomer(response.data.data); // Set the customer data
//           // Store the customer data in localStorage
//           localStorage.setItem('customerDetails', JSON.stringify(response.data.data)); 
//           console.log('Customer details stored in localStorage:', response.data.data); // Logging for debugging
//         } else {
//           setError('Failed to fetch customer details');
//         }
//       } catch (error) {
//         setError('Error fetching customer details');
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchCustomerDetails();
//   }, []); // Empty dependency array ensures this runs once on component mount

//   if (loading) {
//     return <div>Loading...</div>; // Show loading indicator
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error message if there was a problem
//   }

//   if (!customer) {
//     return <div>No customer data found!</div>; // Fallback if customer data is not available
//   }

//   return (
//     <div className="customer-details">
//       <h2>Account Details</h2>
//       <p><strong>Customer ID:</strong> {customer.CustomerID}</p>
//       <p><strong>Account ID:</strong> {customer.AccountID}</p>
//       <p><strong>Account Type:</strong> {customer.AccountType || 'Not Available'}</p>
//       <p><strong>Balance:</strong> ${customer.Balance?.toLocaleString() || '0'}</p>
//       <p><strong>Email:</strong> {customer.Email}</p>
//       <p><strong>Phone:</strong> {customer.Phone}</p>
      
//     </div>
//   );
// };

// export default CustomerDetails;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerDetails.css';

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null); // State to store the customer data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const CustomerID = localStorage.getItem('CustomerID'); // Retrieve the logged-in customer's ID

      if (!CustomerID) {
        setError('You need to log in first!');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5010/api/v1/customers/get/${CustomerID}`);
        console.log('Customer details response:', response.data);

        if (response.data.success) {
          setCustomer(response.data.data); // Set the customer data
          // Store the customer data in localStorage
          localStorage.setItem('customerDetails', JSON.stringify(response.data.data)); 
          console.log('Customer details stored in localStorage:', response.data.data); // Logging for debugging
        } else {
          setError('Failed to fetch customer details');
        }
      } catch (error) {
        setError('Error fetching customer details');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCustomerDetails();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200 text-black">
        <div className="text-xl text-black">Loading...</div>
      </div>
    ); // Show loading indicator
  }

  if (error) {
    return <div className="text-black">{error}</div>; // Show error message if there was a problem
  }

  if (!customer) {
    return <div className="text-black">No customer data found!</div>; // Fallback if customer data is not available
  }

  return (
    <div className="bg-gradient-to-r from-[#3d2a1d] to-[#a07a39] text-black py-12 px-6 sm:px-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">Account Details</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between text-black">
            <p className="font-medium text-lg">Customer ID:</p>
            <p className="text-lg">{customer.CustomerID}</p>
          </div>
          <div className="flex justify-between text-black">
            <p className="font-medium text-lg">Account ID:</p>
            <p className="text-lg">{customer.AccountID}</p>
          </div>
          <div className="flex justify-between text-black">
            <p className="font-medium text-lg">Account Type:</p>
            <p className="text-lg">{customer.AccountType || 'Not Available'}</p>
          </div>
          <div className="flex justify-between text-black">
            <p className="font-medium text-lg">Balance:</p>
            <p className="text-lg">${customer.Balance?.toLocaleString() || '0'}</p>
          </div>
          <div className="flex justify-between text-black">
            <p className="font-medium text-lg">Email:</p>
            <p className="text-lg">{customer.Email}</p>
          </div>
          <div className="flex justify-between text-black">
            <p className="font-medium text-lg">Phone:</p>
            <p className="text-lg">{customer.Phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
