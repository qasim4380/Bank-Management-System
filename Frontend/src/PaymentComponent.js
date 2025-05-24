import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const PaymentComponent = () => {
  const { register, handleSubmit, reset } = useForm();
  const [paymentsByCustomer, setPaymentsByCustomer] = useState([]); // Only Payments by Customer
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  // Get Customer ID from localStorage (or wherever it's saved)
  const customerID = localStorage.getItem('CustomerID');

  // Fetch payments by Customer ID (automatically when the component loads)
  const fetchPaymentsByCustomer = async () => {
    if (!customerID) {
      alert('No customer ID found.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5010/api/v1/payments/get/${customerID}`); // Update with your backend route
      setPaymentsByCustomer(response.data.payments || []);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching payments by Customer ID:', error);
      setMessage(error.response?.data?.message || 'Error fetching payments.');
    } finally {
      setLoading(false);
    }
  };


  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5010/api/v1/payments/create', data);
  
      // If the payment creation is successful
      if (response.data.success) {
        alert('Payment Successful!'); // Show success message in alert
        reset(); // Reset the form fields after successful payment
        fetchPaymentsByCustomer(); // Fetch payments for the customer after successful payment
        navigate('/Customer-Dashboard'); // Redirect to customer dashboard
      } else {
        // Display the backend error message or a default error message
        alert(response.data.message || 'Payment Failed!');
      }
    } catch (error) {
      // Check if the error response is available, and display the backend error message in the alert
      const errorMessage = error.response?.data?.message || 'An error occurred during payment processing.';
      console.error('Error creating payment:', errorMessage);
      alert(errorMessage); // Show the error message from the backend or a fallback message
    } finally {
      setLoading(false); // Stop the loading spinner or indicator
    }
  };

  // Automatically fetch the payments when the component is mounted
  useEffect(() => {
    if (customerID) {
      fetchPaymentsByCustomer();
    } else {
      alert('Customer ID not found. Please log in again.');
    }
  }, [customerID]);

  return (
    <div className="flex h-screen w-full">
      {/* Left section for image */}
      <div className="w-full sm:w-7/12 h-full overflow-hidden">
        <img
          src="/bank.png"
          alt="Bank Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right section for payment management */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Payment Management</h1>
          <p className="text-lg text-gray-300">Manage your payments and transactions.</p>
        </div>

        {/* Create Payment Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
          <h2 className="text-xl text-[#a07a39]">Create a Payment</h2>

          <div className="form-group flex flex-col gap-4 w-full">
            <div>
              <label htmlFor="LoanID" className="text-white font-medium">Loan ID:</label>
              <input type="text" {...register('LoanID', { required: 'Loan ID is required' })} className="p-3 w-full border border-gray-400 rounded-lg" />
            </div>

            <div>
              <label htmlFor="Amount" className="text-white font-medium">Amount:</label>
              <input type="number" {...register('Amount', { required: 'Amount is required', min: 1 })} className="p-3 w-full border border-gray-400 rounded-lg" />
            </div>

            <div>
              <label htmlFor="PaymentMethod" className="text-white font-medium">Payment Method:</label>
              <select {...register('PaymentMethod', { required: 'Payment Method is required' })} className="p-3 w-full border border-gray-400 rounded-lg">
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            <div>
              <label htmlFor="PIN" className="text-white font-medium">PIN:</label>
              <input type="password" {...register('PIN', { required: 'PIN is required' })} className="p-3 w-full border border-gray-400 rounded-lg" />
            </div>
          </div>

          <button type="submit" className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6" disabled={loading}>
            {loading ? 'Processing...' : 'Submit Payment'}
          </button>
        </form>

        {/* Display Payments by Customer in a Table */}
        <div className="mt-10 w-full overflow-x-auto">
          <h2 className="text-xl text-[#a07a39] mb-4">Payments by Customer</h2>
          {paymentsByCustomer.length > 0 ? (
            <table className="min-w-full bg-white text-gray-900 rounded-lg shadow-md">
              <thead>
                <tr className="bg-[#a07a39] text-white">
                  <th className="py-2 px-4">Payment ID</th>
                  <th className="py-2 px-4">Loan ID</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {paymentsByCustomer.map((payment) => (
                  <tr key={payment.PaymentID} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">{payment.PaymentID}</td>
                    <td className="py-2 px-4">{payment.LoanID}</td>
                    <td className="py-2 px-4">${payment.PaymentAmount}</td>
                    <td className="py-2 px-4">
                      {new Date(payment.PaymentDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400">No payments found for Customer ID {customerID}.</p>
          )}
        </div>

        {/* Message Display */}
        {message && <p className="mt-4 text-center text-white-500">{message}</p>}
      </div>
    </div>
  );
};

export default PaymentComponent;
