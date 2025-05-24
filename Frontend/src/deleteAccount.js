

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import "./Form.css";

const DeleteAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate(); // Initialize navigate function

  // Handle form submission
  const onSubmit = async (data) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        setLoading(true); // Start loading

        // Check if the Customer ID exists before attempting deletion
        const response = await axios.get(`http://localhost:5010/api/v1/customers/get/${data.CustomerID}`);
        
        if (response.data.success) {
          // Proceed with deletion if the customer exists
          const deleteResponse = await axios.delete(
            `http://localhost:5010/api/v1/customers/delete/${data.CustomerID}`
          );

          if (deleteResponse.data.success) {
            alert("Account deleted successfully.");
            reset(); // Reset the form fields after successful deletion
            navigate("/login"); // Redirect to the login page after successful deletion
          } else {
            alert("Failed to delete the account. Please try again.");
          }
        } else {
          // If the customer ID doesn't exist, show alert and error message
          alert("Invalid Customer ID. Please check and try again.");
          setErrorMessage("Invalid Customer ID. Please check and try again.");
        }
      } catch (error) {
        console.error("Error deleting account:", error.response?.data || error);
        alert(
          error.response?.data?.message ||
          "An error occurred while attempting to delete the account."
        );
      } finally {
        setLoading(false); // Stop loading
      }
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

      {/* Right section for delete account form */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Delete Account</h1>
          <p className="text-lg text-gray-300">Please enter your Customer ID to delete the account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
          {/* Customer ID Field */}
          <div className="form-group">
            <label htmlFor="CustomerID" className="text-white font-medium">Customer ID:</label>
            <input
              type="text"
              id="CustomerID"
              {...register("CustomerID", { required: "Customer ID is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {/* Error message if there's a form validation error */}
            {errors.CustomerID && <p className="text-red-500">{errors.CustomerID.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Account"}
          </button>
        </form>

        {/* Error message below the form */}
        {errorMessage && (
          <p className="mt-4 text-center text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default DeleteAccount;


