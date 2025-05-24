


// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddEmployee = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "http://localhost:5010/api/v1/employees/create",
//         data
//       );

//       alert(response.data.message);
//       reset();
//       setErrorMessage('');
//       navigate("/admindashboard"); // Optional: Navigate to employee dashboard
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || "Error adding employee";
//       setErrorMessage(errorMsg);
//       alert(errorMsg);
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
//           alt="Employee Image"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Right section for form */}
//       <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl text-[#a07a39] font-semibold">Add Employee</h1>
//           <p className="text-lg text-gray-300">Enter employee details</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
//           <div>
//             <label htmlFor="EmployeeID" className="text-white font-medium">Employee ID:</label>
//             <input
//               type="text"
//               id="EmployeeID"
//               {...register("EmployeeID", { required: "Employee ID is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.EmployeeID && <p className="text-red-500">{errors.EmployeeID.message}</p>}
//           </div>

//           <div>
//             <label htmlFor="FirstName" className="text-white font-medium">First Name:</label>
//             <input
//               type="text"
//               id="FirstName"
//               {...register("FirstName", { required: "First name is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.FirstName && <p className="text-red-500">{errors.FirstName.message}</p>}
//           </div>

//           <div>
//             <label htmlFor="LastName" className="text-white font-medium">Last Name:</label>
//             <input
//               type="text"
//               id="LastName"
//               {...register("LastName", { required: "Last name is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.LastName && <p className="text-red-500">{errors.LastName.message}</p>}
//           </div>

//           <div>
//             <label htmlFor="Position" className="text-white font-medium">Position:</label>
//             <input
//               type="text"
//               id="Position"
//               {...register("Position", { required: "Position is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.Position && <p className="text-red-500">{errors.Position.message}</p>}
//           </div>

//           <div>
//             <label htmlFor="Salary" className="text-white font-medium">Salary:</label>
//             <input
//               type="number"
//               id="Salary"
//               {...register("Salary", {
//                 required: "Salary is required",
//                 min: { value: 1, message: "Salary must be a positive number" },
//               })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.Salary && <p className="text-red-500">{errors.Salary.message}</p>}
//           </div>

//           <div>
//             <label htmlFor="HireDate" className="text-white font-medium">Hire Date:</label>
//             <input
//               type="date"
//               id="HireDate"
//               {...register("HireDate", { required: "Hire date is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.HireDate && <p className="text-red-500">{errors.HireDate.message}</p>}
//           </div>

//           <div>
//             <label htmlFor="BranchID" className="text-white font-medium">Branch ID:</label>
//             <input
//               type="text"
//               id="BranchID"
//               {...register("BranchID", { required: "Branch ID is required" })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.BranchID && <p className="text-red-500">{errors.BranchID.message}</p>}
//           </div>

//           <button
//             type="submit"
//             className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
//           >
//             {loading ? 'Adding...' : 'Add Employee'}
//           </button>
//         </form>

//         {errorMessage && (
//           <p className="mt-4 text-center text-red-500">{errorMessage}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5010/api/v1/employees/create",
        data
      );

      alert(response.data.message);
      reset();
      setErrorMessage('');
      navigate("/admindashboard"); // Optional: Navigate to employee dashboard
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error adding employee";
      setErrorMessage(errorMsg);
      alert(errorMsg);
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
          alt="Employee Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right section for form */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-start items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Add Employee</h1>
          <p className="text-lg text-gray-300">Enter employee details</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm mt-6">
          <div>
            <label htmlFor="EmployeeID" className="text-white font-medium">Employee ID:</label>
            <input
              type="text"
              id="EmployeeID"
              {...register("EmployeeID", { required: "Employee ID is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.EmployeeID && <p className="text-red-500">{errors.EmployeeID.message}</p>}
          </div>

          <div>
            <label htmlFor="FirstName" className="text-white font-medium">First Name:</label>
            <input
              type="text"
              id="FirstName"
              {...register("FirstName", { required: "First name is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.FirstName && <p className="text-red-500">{errors.FirstName.message}</p>}
          </div>

          <div>
            <label htmlFor="LastName" className="text-white font-medium">Last Name:</label>
            <input
              type="text"
              id="LastName"
              {...register("LastName", { required: "Last name is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.LastName && <p className="text-red-500">{errors.LastName.message}</p>}
          </div>

          <div>
            <label htmlFor="Position" className="text-white font-medium">Position:</label>
            <input
              type="text"
              id="Position"
              {...register("Position", { required: "Position is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.Position && <p className="text-red-500">{errors.Position.message}</p>}
          </div>

          <div>
            <label htmlFor="Salary" className="text-white font-medium">Salary:</label>
            <input
              type="number"
              id="Salary"
              {...register("Salary", {
                required: "Salary is required",
                min: { value: 1, message: "Salary must be a positive number" },
              })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.Salary && <p className="text-red-500">{errors.Salary.message}</p>}
          </div>

          <div>
            <label htmlFor="HireDate" className="text-white font-medium">Hire Date:</label>
            <input
              type="date"
              id="HireDate"
              {...register("HireDate", { required: "Hire date is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.HireDate && <p className="text-red-500">{errors.HireDate.message}</p>}
          </div>

          <div>
            <label htmlFor="BranchID" className="text-white font-medium">Branch ID:</label>
            <input
              type="text"
              id="BranchID"
              {...register("BranchID", { required: "Branch ID is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.BranchID && <p className="text-red-500">{errors.BranchID.message}</p>}
          </div>

          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
          >
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
        </form>

        {errorMessage && (
          <p className="mt-4 text-center text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default AddEmployee;

