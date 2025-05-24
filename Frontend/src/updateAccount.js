// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./Form.css";

// const UpdateAccount = () => {
//   const { register, handleSubmit, formState: { errors }, setValue } = useForm();
//   const [loading, setLoading] = useState(false);
//   const CustomerID = localStorage.getItem('CustomerID'); // Retrieve CustomerID from local storage

//   // Fetch customer data and populate form
//   useEffect(() => {
//     if (CustomerID) {
//       axios.get(`http://localhost:5010/api/v1/customers/get/${CustomerID}`)
//         .then((response) => {
//           const customer = response.data;
//           Object.keys(customer).forEach((key) => setValue(key, customer[key]));
//         })
//         .catch((error) => {
//           console.error("Error fetching customer data:", error);
//           alert("Failed to load customer data. Please try again.");
//         });
//     }
//   }, [CustomerID, setValue]);

//   // Submit the updated data to the backend
//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);

//       // Send only the entered values (filter out empty fields)
//       const filteredData = Object.fromEntries(
//         Object.entries(data).filter(([_, value]) => value !== undefined && value !== "")
//       );
      
//       const response = await axios.put(
//         `http://localhost:5010/api/v1/customers/update/${CustomerID}`,
//         filteredData
//       );

//       if (response.data.success) {
//         alert("Account updated successfully!");
//       } else {
//         alert("Failed to update the account. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error updating account:", error.response?.data || error);
//       alert(error.response?.data?.message || "An error occurred while updating the account.");
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

//       {/* Right section for update account form */}
//       <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl text-[#a07a39] font-semibold">Update Account</h1>
//           <p className="text-lg text-gray-300">Please update your account details below.</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
//           {/* First Name */}
//           <div className="form-group">
//             <label htmlFor="FirstName" className="text-white font-medium">First Name:</label>
//             <input
//               type="text"
//               id="FirstName"
//               {...register("FirstName", { required: "First Name is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.FirstName && <p className="text-red-500">{errors.FirstName.message}</p>}
//           </div>

//           {/* Last Name */}
//           <div className="form-group">
//             <label htmlFor="LastName" className="text-white font-medium">Last Name:</label>
//             <input
//               type="text"
//               id="LastName"
//               {...register("LastName", { required: "Last Name is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.LastName && <p className="text-red-500">{errors.LastName.message}</p>}
//           </div>

//           {/* Address */}
//           <div className="form-group">
//             <label htmlFor="Address" className="text-white font-medium">Address:</label>
//             <input
//               type="text"
//               id="Address"
//               {...register("Address")}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//           </div>

//           {/* Email */}
//           <div className="form-group">
//             <label htmlFor="Email" className="text-white font-medium">Email:</label>
//             <input
//               type="email"
//               id="Email"
//               {...register("Email", { required: "Email is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.Email && <p className="text-red-500">{errors.Email.message}</p>}
//           </div>

//           {/* Phone */}
//           <div className="form-group">
//             <label htmlFor="Phone" className="text-white font-medium">Phone:</label>
//             <input
//               type="tel"
//               id="Phone"
//               {...register("Phone")}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//           </div>

//           {/* Branch ID */}
//           <div className="form-group">
//             <label htmlFor="BranchID" className="text-white font-medium">Branch ID:</label>
//             <input
//               type="text"
//               id="BranchID"
//               {...register("BranchID")}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Update Account"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateAccount;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import "./Form.css";

const UpdateAccount = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const CustomerID = localStorage.getItem('CustomerID'); // Retrieve CustomerID from local storage
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch customer data and populate form
  useEffect(() => {
    if (CustomerID) {
      axios.get(`http://localhost:5010/api/v1/customers/get/${CustomerID}`)
        .then((response) => {
          const customer = response.data;
          Object.keys(customer).forEach((key) => setValue(key, customer[key]));
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
          alert("Failed to load customer data. Please try again.");
        });
    }
  }, [CustomerID, setValue]);

  // Submit the updated data to the backend
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Send only the entered values (filter out empty fields)
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined && value !== "")
      );
      
      const response = await axios.put(
        `http://localhost:5010/api/v1/customers/update/${CustomerID}`,
        filteredData
      );

      if (response.data.success) {
        alert("Account updated successfully!");
        navigate("/customer-dashboard");  // Redirect to Customer Dashboard on success
      } else {
        alert("Failed to update the account. Please try again.");
      }
    } catch (error) {
      console.error("Error updating account:", error.response?.data || error);
      alert(error.response?.data?.message || "An error occurred while updating the account.");
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

      {/* Right section for update account form */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Update Account</h1>
          <p className="text-lg text-gray-300">Please update your account details below.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="FirstName" className="text-white font-medium">First Name:</label>
            <input
              type="text"
              id="FirstName"
              {...register("FirstName", { required: "First Name is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.FirstName && <p className="text-red-500">{errors.FirstName.message}</p>}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="LastName" className="text-white font-medium">Last Name:</label>
            <input
              type="text"
              id="LastName"
              {...register("LastName", { required: "Last Name is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.LastName && <p className="text-red-500">{errors.LastName.message}</p>}
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="Address" className="text-white font-medium">Address:</label>
            <input
              type="text"
              id="Address"
              {...register("Address")}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="Email" className="text-white font-medium">Email:</label>
            <input
              type="email"
              id="Email"
              {...register("Email", { required: "Email is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.Email && <p className="text-red-500">{errors.Email.message}</p>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="Phone" className="text-white font-medium">Phone:</label>
            <input
              type="tel"
              id="Phone"
              {...register("Phone")}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          {/* Branch ID */}
          <div className="form-group">
            <label htmlFor="BranchID" className="text-white font-medium">Branch ID:</label>
            <input
              type="text"
              id="BranchID"
              {...register("BranchID")}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccount;
