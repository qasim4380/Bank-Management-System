

// import React from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// const Withdraw = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   // Handle form submission
//   const onSubmit = async (data) => {
//     try {
//       console.log("Withdrawal Data:", data);
//       const response = await axios.post(
//         "http://localhost:5010/api/v1/accountcards/withdrawl", // Backend endpoint
//         data
//       );
//       alert(response.data.message);
//       console.log("Withdrawal successful:", response.data);
//       // reset(); // Reset form fields
//     } catch (error) {
//       console.error("Error during withdrawal:", error.response?.data || error);
//       alert(
//         error.response?.data?.message || "An error occurred during the withdrawal."
//       );
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

//       {/* Right section for withdraw form */}
//       <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl text-[#a07a39] font-semibold">Withdraw Amount</h1>
//           <p className="text-lg text-gray-300">Enter the details to withdraw</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
//           {/* Customer ID Field */}
//           <div className="form-group">
//             <label htmlFor="CustomerID" className="text-white font-medium">
//               Customer ID:
//             </label>
//             <input
//               type="text"
//               id="CustomerID"
//               {...register("CustomerID", { required: "Customer ID is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.CustomerID && (
//               <p className="text-red-500">{errors.CustomerID.message}</p>
//             )}
//           </div>

//           {/* Card Type Field */}
//           <div className="form-group">
//             <label htmlFor="CardType" className="text-white font-medium">
//               Card Type:
//             </label>
//             <select
//               id="CardType"
//               {...register("CardType", { required: "Card Type is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             >
//               <option value="">-- Select Card Type --</option>
//               <option value="credit">Credit</option>
//               <option value="debit">Debit</option>
//             </select>
//             {errors.CardType && <p className="text-red-500">{errors.CardType.message}</p>}
//           </div>

//           {/* PIN Field */}
//           <div className="form-group">
//             <label htmlFor="PIN" className="text-white font-medium">
//               PIN:
//             </label>
//             <input
//               type="password"
//               id="PIN"
//               {...register("PIN", {
//                 required: "PIN is required",
//                 minLength: {
//                   value: 4,
//                   message: "PIN must be at least 4 digits long",
//                 },
//               })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.PIN && <p className="text-red-500">{errors.PIN.message}</p>}
//           </div>

//           {/* Amount Field */}
//           <div className="form-group">
//             <label htmlFor="Amount" className="text-white font-medium">
//               Amount:
//             </label>
//             <input
//               type="number"
//               id="Amount"
//               {...register("Amount", {
//                 required: "Amount is required",
//                 min: { value: 1, message: "Amount must be greater than zero" },
//               })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.Amount && <p className="text-red-500">{errors.Amount.message}</p>}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
//           >
//             Withdraw
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Withdraw;




import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Withdraw = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // State to store the error message
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true); // Set loading to true when the request is made
      // Sending a POST request to the backend
      const response = await axios.post(
        "http://localhost:5010/api/v1/accountcards/withdrawl", // Backend endpoint
        data
      );

      // On success, reset the form and clear any previous error
      alert(response.data.message); // Show success alert
      console.log("Withdrawal successful:", response.data);
      reset(); // Reset form fields
      setErrorMessage(''); // Clear any previous error messages

      // Redirect to customer dashboard after successful withdrawal
      navigate("/Customer-Dashboard"); // Redirect to Customer Dashboard page

    } catch (error) {
      console.error("Error during withdrawal:", error.response?.data || error);

      // Set the error message to be displayed below the form
      const errorMsg = error.response?.data?.message || "An error occurred during the withdrawal.";
      setErrorMessage(errorMsg); // Store error message in state

      alert(errorMsg); // Show error in alert
    } finally {
      setLoading(false); // Set loading to false after the request is completed
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

      {/* Right section for withdraw form */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Withdraw Amount</h1>
          <p className="text-lg text-gray-300">Enter the details to withdraw</p>
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

          {/* Card Type Field */}
          <div className="form-group">
            <label htmlFor="CardType" className="text-white font-medium">
              Card Type:
            </label>
            <select
              id="CardType"
              {...register("CardType", { required: "Card Type is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            >
              <option value="">-- Select Card Type --</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            {errors.CardType && <p className="text-red-500">{errors.CardType.message}</p>}
          </div>

          {/* PIN Field */}
          <div className="form-group">
            <label htmlFor="PIN" className="text-white font-medium">
              PIN:
            </label>
            <input
              type="password"
              id="PIN"
              {...register("PIN", {
                required: "PIN is required",
                minLength: {
                  value: 4,
                  message: "PIN must be at least 4 digits long",
                },
              })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.PIN && <p className="text-red-500">{errors.PIN.message}</p>}
          </div>

          {/* Amount Field */}
          <div className="form-group">
            <label htmlFor="Amount" className="text-white font-medium">
              Amount:
            </label>
            <input
              type="number"
              id="Amount"
              {...register("Amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than zero" },
              })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.Amount && <p className="text-red-500">{errors.Amount.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
          >
            {loading ? 'Processing...' : 'Withdraw'}
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

export default Withdraw;
