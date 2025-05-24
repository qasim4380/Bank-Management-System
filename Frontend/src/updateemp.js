
    


// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const UpdateEmployee = () => {
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);
//       const response = await axios.put(
//         `http://localhost:5010/api/v1/employees/update/${data.EmployeeID}`,
//         data
//       );
//       alert(response.data.message);
//       setErrorMessage('');
//       reset();
//       navigate('/admindashboard'); // Redirect after successful update
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Error updating employee';
//       setErrorMessage(errorMsg);
//       alert(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen w-full">
//       {/* Left side image */}
//       <div className="w-full sm:w-7/12 h-full overflow-hidden">
//         <img
//           src="/bank.png"
//           alt="Bank"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Right side form */}
//       <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
//         <div className="text-center mb-6">
//           <h1 className="text-4xl text-[#a07a39] font-semibold">Update Employee</h1>
//           <p className="text-lg text-gray-300">Modify employee details below</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-sm">
//           <div className="form-group">
//             <label className="text-white font-medium">Employee ID</label>
//             <input
//               type="text"
//               {...register('EmployeeID', { required: 'Employee ID is required' })}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//             {errors.EmployeeID && <p className="text-red-500">{errors.EmployeeID.message}</p>}
//           </div>

//           <div className="form-group">
//             <label className="text-white font-medium">First Name</label>
//             <input
//               type="text"
//               {...register('FirstName')}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//           </div>

//           <div className="form-group">
//             <label className="text-white font-medium">Last Name</label>
//             <input
//               type="text"
//               {...register('LastName')}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//           </div>

//           <div className="form-group">
//             <label className="text-white font-medium">Position</label>
//             <input
//               type="text"
//               {...register('Position')}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//           </div>

//           <div className="form-group">
//             <label className="text-white font-medium">Salary</label>
//             <input
//               type="number"
//               {...register('Salary')}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//           </div>

//           <div className="form-group">
//             <label className="text-white font-medium">Hire Date</label>
//             <input
//               type="date"
//               {...register('HireDate')}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//           </div>

//           <div className="form-group">
//             <label className="text-white font-medium">Branch ID</label>
//             <input
//               type="text"
//               {...register('BranchID')}
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//           </div>

//           <button
//             type="submit"
//             className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-4"
//           >
//             {loading ? 'Updating...' : 'Update Employee'}
//           </button>
//         </form>

//         {errorMessage && (
//           <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpdateEmployee;




import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5010/api/v1/employees/update/${data.EmployeeID}`,
        data
      );
      alert(response.data.message);
      setErrorMessage('');
      reset();
      navigate('/admindashboard'); // Redirect after successful update
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error updating employee';
      setErrorMessage(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side image */}
      <div className="w-full sm:w-7/12 h-full overflow-hidden">
        <img
          src="/bank.png"
          alt="Bank"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side form */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-6 mt-10">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Update Employee</h1>
          <p className="text-lg text-gray-300">Modify employee details below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-sm">
          <div className="form-group">
            <label className="text-white font-medium">Employee ID</label>
            <input
              type="text"
              {...register('EmployeeID', { required: 'Employee ID is required' })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.EmployeeID && <p className="text-red-500">{errors.EmployeeID.message}</p>}
          </div>

          <div className="form-group">
            <label className="text-white font-medium">First Name</label>
            <input
              type="text"
              {...register('FirstName')}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          <div className="form-group">
            <label className="text-white font-medium">Last Name</label>
            <input
              type="text"
              {...register('LastName')}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          <div className="form-group">
            <label className="text-white font-medium">Position</label>
            <input
              type="text"
              {...register('Position')}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          <div className="form-group">
            <label className="text-white font-medium">Salary</label>
            <input
              type="number"
              {...register('Salary')}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          <div className="form-group">
            <label className="text-white font-medium">Hire Date</label>
            <input
              type="date"
              {...register('HireDate')}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          <div className="form-group">
            <label className="text-white font-medium">Branch ID</label>
            <input
              type="text"
              {...register('BranchID')}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-4"
          >
            {loading ? 'Updating...' : 'Update Employee'}
          </button>
        </form>

        {errorMessage && (
          <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default UpdateEmployee;
