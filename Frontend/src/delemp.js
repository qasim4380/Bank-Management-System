import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteEmployee = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Redirect hook

  const onSubmit = async ({ EmployeeID }) => {
    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:5010/api/v1/employees/delete/${EmployeeID}`);
      alert(response.data.message);
      setErrorMessage('');
      reset();
      navigate('/admindashboard'); // Redirect after successful deletion
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error deleting employee';
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
          alt="Bank Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right section for form */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Delete Employee</h1>
          <p className="text-lg text-gray-300">Enter the Employee ID to delete</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
          {/* Employee ID Field */}
          <div className="form-group">
            <label htmlFor="EmployeeID" className="text-white font-medium">
              Employee ID:
            </label>
            <input
              type="text"
              id="EmployeeID"
              {...register("EmployeeID", { required: "Employee ID is required" })}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
            {errors.EmployeeID && (
              <p className="text-red-500">{errors.EmployeeID.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
          >
            {loading ? 'Deleting...' : 'Delete Employee'}
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

export default DeleteEmployee;
