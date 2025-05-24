
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const RequestATM = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       console.log("ATM Card Request Data:", data);
//       const response = await axios.post(
//         "http://localhost:5010/api/v1/accountcards/create", // Backend endpoint
//         data
//       );

//       console.log("ATM Card Request Response:", response.data);
//       alert(`ATM Card Request Successful! Response: ${response.data.message}`);
//       navigate("/customer-dashboard");
//     } catch (error) {
//       console.error("Error requesting ATM card:", error);

//       // Handle cases where error.response is undefined
//       const errorMessage =
//         error.response?.data?.message || "An unexpected error occurred. Please try again.";
//       alert(`Failed to request ATM card: ${errorMessage}`);
//     }
//   };

//   return (
//     <div className="flex h-screen w-full">
//       {/* Left section for image */}
//       <div className="w-full sm:w-7/12 h-full overflow-hidden">
//         <img
//           src="/bank.png"
//           alt="Bank Image"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Right section for ATM request form */}
//       <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl text-[#a07a39] font-semibold">Request ATM Card</h1>
//           <p className="text-lg text-gray-300">Fill in the details below</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
//           {/* Name Field */}
//           <div className="form-group">
//             <label htmlFor="Name" className="text-white font-medium">Name:</label>
//             <input
//               type="text"
//               id="Name"
//               placeholder="Enter your name"
//               {...register("Name", { required: "Name is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
//           </div>

//           {/* Account ID Field */}
//           <div className="form-group">
//             <label htmlFor="AccountID" className="text-white font-medium">Account ID:</label>
//             <input
//               type="text"
//               id="AccountID"
//               placeholder="Enter your Account ID"
//               {...register("AccountID", { required: "Account ID is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.AccountID && <p className="text-red-500">{errors.AccountID.message}</p>}
//           </div>

//           {/* Card Type Field */}
//           <div className="form-group">
//             <label htmlFor="CardType" className="text-white font-medium">Card Type:</label>
//             <select
//               id="CardType"
//               {...register("CardType", { required: "Card type is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             >
//               <option value="">Select Card Type</option>
//               <option value="Debit">Debit</option>
//               <option value="Credit">Credit</option>
//             </select>
//             {errors.CardType && <p className="text-red-500">{errors.CardType.message}</p>}
//           </div>

//           {/* PIN Field */}
//           <div className="form-group">
//             <label htmlFor="PIN" className="text-white font-medium">PIN:</label>
//             <input
//               type="password"
//               id="PIN"
//               placeholder="Enter a 4-digit PIN"
//               {...register("PIN", {
//                 required: "PIN is required",
//                 pattern: {
//                   value: /^\d{4}$/,
//                   message: "PIN must be exactly 4 digits",
//                 },
//               })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.PIN && <p className="text-red-500">{errors.PIN.message}</p>}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
//           >
//             Request ATM Card
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RequestATM;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequestATM = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // This state controls the "Processing..." text
  const navigate = useNavigate(); // Initialize navigate function

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true); // Start loading when form is submitted
      console.log("ATM Card Request Data:", data);

      // Sending a POST request to request ATM card
      const response = await axios.post('http://localhost:5010/api/v1/accountcards/create', data);

      // On success, show success message and reset the form
      alert(`${response.data.message}`);
      console.log("ATM Card Request Response:", response.data);
      setErrorMessage('ATM Card request successful!');

      reset(); // Reset form fields
      navigate("/customer-dashboard"); // Redirect to Customer Dashboard after success

    } catch (error) {
      console.error("Error requesting ATM card:", error);

      // Handle error response and show error message
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      setErrorMessage(errorMessage);
      alert(`${errorMessage}`);
    } finally {
      setLoading(false); // Stop loading once the request is completed
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

      {/* Right section for ATM request form */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Request ATM Card</h1>
          <p className="text-lg text-gray-300">Fill in the details below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="Name" className="text-white font-medium">Name:</label>
            <input
              type="text"
              id="Name"
              placeholder="Enter your name"
              {...register("Name", { required: "Name is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
          </div>

          {/* Account ID Field */}
          <div className="form-group">
            <label htmlFor="AccountID" className="text-white font-medium">Account ID:</label>
            <input
              type="text"
              id="AccountID"
              placeholder="Enter your Account ID"
              {...register("AccountID", { required: "Account ID is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.AccountID && <p className="text-red-500">{errors.AccountID.message}</p>}
          </div>

          {/* Card Type Field */}
          <div className="form-group">
            <label htmlFor="CardType" className="text-white font-medium">Card Type:</label>
            <select
              id="CardType"
              {...register("CardType", { required: "Card type is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            >
              <option value="">Select Card Type</option>
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
            </select>
            {errors.CardType && <p className="text-red-500">{errors.CardType.message}</p>}
          </div>

          {/* PIN Field */}
          <div className="form-group">
            <label htmlFor="PIN" className="text-white font-medium">PIN:</label>
            <input
              type="password"
              id="PIN"
              placeholder="Enter a 4-digit PIN"
              {...register("PIN", {
                required: "PIN is required",
                pattern: {
                  value: /^\d{4}$/,
                  message: "PIN must be exactly 4 digits",
                },
              })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.PIN && <p className="text-red-500">{errors.PIN.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
          >
            {loading ? 'Processing...' : 'Request ATM Card'}
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

export default RequestATM;
