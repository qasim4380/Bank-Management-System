


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Loan = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  // Handle form submission
  const onSubmit = async (data) => {
    const { CustomerID, LoanType } = data;

    try {
      setLoading(true);
      // Sending a POST request to create a loan
      const response = await axios.post('http://localhost:5010/api/v1/loans/create', {
        CustomerID,
        LoanType,
      });

      if (response.data.success) {
        setMessage('Loan created successfully!');
        alert('Loan created successfully!');
        reset(); // Reset form fields
        navigate('/Customer-Dashboard'); // Redirect to Customer Dashboard after success
      } else {
        setMessage(response.data.message);
        alert(response.data.message); // Show the error message in alert
      }
    } catch (error) {
      console.error(error);

      // If error response exists, use the backend error message
      if (error.response) {
        setMessage(error.response.data.message);
        alert(error.response.data.message); // Show the error message in alert
      } else {
        setMessage('Error creating loan. Please try again later.');
        alert('Error creating loan. Please try again later.'); // Show generic error message
      }
    } finally {
      setLoading(false);
    }
  };

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

      {/* Right section for loan form */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Create a Loan</h1>
          <p className="text-lg text-gray-300">Enter the details to create a loan</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
          {/* Customer ID Field */}
          <div className="form-group">
            <label htmlFor="CustomerID" className="text-white font-medium">
              Customer ID:
            </label>
            <input
              type="text"
              id="CustomerID"
              {...register("CustomerID", { required: "Customer ID is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.CustomerID && (
              <p className="text-red-500">{errors.CustomerID.message}</p>
            )}
          </div>

          {/* Loan Type Field */}
          <div className="form-group">
            <label htmlFor="LoanType" className="text-white font-medium">
              Loan Type:
            </label>
            <input
              type="text"
              id="LoanType"
              {...register("LoanType", { required: "Loan Type is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.LoanType && <p className="text-red-500">{errors.LoanType.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
          >
            {loading ? 'Processing...' : 'Create Loan'}
          </button>
        </form>

        {/* Display message */}
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Loan;
