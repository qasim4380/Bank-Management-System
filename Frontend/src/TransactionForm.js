



// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// const CreateTransaction = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setSuccessMessage(null);
//     setErrorMessage(null);

//     try {
//       const response = await axios.post(
//         "http://localhost:5010/api/v1/transactions/create",
//         data
//       );

//       if (response.data.success) {
//         setSuccessMessage(response.data.message);
//         console.log("Transaction successful:", response.data);
//         alert("Transaction successful!");
//       } else {
//         setErrorMessage(response.data.message || "Transaction failed.");
//       }
//     } catch (error) {
//       setErrorMessage(
//         error.response?.data?.message || "An error occurred during the transaction."
//       );
//     } finally {
//       setLoading(false);
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

//       {/* Right section for create transaction form */}
//       <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl text-[#a07a39] font-semibold">Create Transaction</h1>
//           <p className="text-lg text-gray-300">Please enter the transaction details.</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
//           {/* Account ID */}
//           <div className="form-group">
//             <label htmlFor="AccountID" className="text-white font-medium">Account ID:</label>
//             <input
//               type="text"
//               id="AccountID"
//               {...register("AccountID", { required: "Account ID is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.AccountID && <p className="text-red-500">{errors.AccountID.message}</p>}
//           </div>

//           {/* Amount */}
//           <div className="form-group">
//             <label htmlFor="Amount" className="text-white font-medium">Amount:</label>
//             <input
//               type="number"
//               id="Amount"
//               {...register("Amount", {
//                 required: "Amount is required",
//                 min: { value: 1, message: "Amount must be greater than 0" },
//               })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.Amount && <p className="text-red-500">{errors.Amount.message}</p>}
//           </div>

//           {/* Card Type */}
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

//           {/* PIN */}
//           <div className="form-group">
//             <label htmlFor="PIN" className="text-white font-medium">PIN:</label>
//             <input
//               type="password"
//               id="PIN"
//               {...register("PIN", { required: "PIN is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.PIN && <p className="text-red-500">{errors.PIN.message}</p>}
//           </div>

//           {/* Receiver ID */}
//           <div className="form-group">
//             <label htmlFor="ReceiverID" className="text-white font-medium">Receiver ID:</label>
//             <input
//               type="text"
//               id="ReceiverID"
//               {...register("ReceiverID", { required: "Receiver ID is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.ReceiverID && <p className="text-red-500">{errors.ReceiverID.message}</p>}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Create Transaction"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTransaction;




import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection

const CreateTransaction = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:5010/api/v1/transactions/create", // Backend endpoint
        data
      );

      if (response.data.success) {
        setSuccessMessage(response.data.message); // Store success message in state
        console.log("Transaction successful:", response.data);
        alert("Transaction successful!"); // Show success alert
        reset(); // Reset form fields
        setErrorMessage(''); // Clear any previous error messages

        navigate("/Customer-Dashboard"); // Redirect to customer dashboard
      } else {
        setErrorMessage(response.data.message || "Transaction failed."); // Set error message for failure
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred during the transaction." // Set error message
      );
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

      {/* Right section for create transaction form */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Create Transaction</h1>
          <p className="text-lg text-gray-300">Please enter the transaction details.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
          {/* Account ID Field */}
          <div className="form-group">
            <label htmlFor="AccountID" className="text-white font-medium">Account ID:</label>
            <input
              type="text"
              id="AccountID"
              {...register("AccountID", { required: "Account ID is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.AccountID && <p className="text-red-500">{errors.AccountID.message}</p>}
          </div>

          {/* Amount Field */}
          <div className="form-group">
            <label htmlFor="Amount" className="text-white font-medium">Amount:</label>
            <input
              type="number"
              id="Amount"
              {...register("Amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than 0" },
              })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.Amount && <p className="text-red-500">{errors.Amount.message}</p>}
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
              {...register("PIN", { required: "PIN is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.PIN && <p className="text-red-500">{errors.PIN.message}</p>}
          </div>

          {/* Receiver ID Field */}
          <div className="form-group">
            <label htmlFor="ReceiverID" className="text-white font-medium">Receiver ID:</label>
            <input
              type="text"
              id="ReceiverID"
              {...register("ReceiverID", { required: "Receiver ID is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.ReceiverID && <p className="text-red-500">{errors.ReceiverID.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
            disabled={loading}
          >
            {loading ? "Processing..." : "Create Transaction"}
          </button>
        </form>

        {/* Error message below the form */}
        {errorMessage && (
          <p className="mt-4 text-center text-red-500">{errorMessage}</p>
        )}

        {/* Success message below the form */}
        {successMessage && (
          <p className="mt-4 text-center text-green-500">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CreateTransaction;
