import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const ShowEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, reset } = useForm();

  // Fetch all employees
  const fetchAllEmployees = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5010/api/v1/employees/getall');
      setEmployees(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching employees.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch employee by ID
  const fetchEmployeeByID = async (data) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5010/api/v1/employees//getbyeid/${data.searchValue}`);
      setEmployees([response.data.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching employee by ID.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch employees by BranchID
  const fetchEmployeesByBranchID = async (data) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5010/api/v1/employees/getbybid/${data.searchValue}`);
      setEmployees(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching employees by BranchID.');
    } finally {
      setLoading(false);
    }
  };

  // Handle search form submission
  const onSubmit = async (data) => {
    reset(); // Clear form after submission
    if (data.searchType === 'all') {
      fetchAllEmployees();
    } else if (data.searchType === 'employee') {
      fetchEmployeeByID(data);
    } else if (data.searchType === 'branch') {
      fetchEmployeesByBranchID(data);
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

      {/* Right side form and results */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Employee Management</h1>
          <p className="text-lg text-gray-300">Search employees below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
          <div>
            <label className="text-white font-medium">Search Type:</label>
            <select {...register('searchType')} defaultValue="all" className="p-3 w-full border border-gray-400 rounded-lg">
              <option value="all">All Employees</option>
              <option value="employee">Employee by ID</option>
              <option value="branch">Employees by BranchID</option>
            </select>
          </div>
          <div>
            <label className="text-white font-medium">Search Value:</label>
            <input type="text" {...register('searchValue')} placeholder="Enter ID or BranchID" className="p-3 w-full border border-gray-400 rounded-lg" />
          </div>
          <button type="submit" disabled={loading} className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-4">
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {employees.length > 0 ? (
          <div className="w-full overflow-x-auto mt-6">
            <table className="min-w-full bg-[#4a2d1b] text-white rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Employee ID</th>
                  <th className="px-4 py-2 text-left">First Name</th>
                  <th className="px-4 py-2 text-left">Last Name</th>
                  <th className="px-4 py-2 text-left">Position</th>
                  <th className="px-4 py-2 text-left">Salary</th>
                  <th className="px-4 py-2 text-left">Hire Date</th>
                  <th className="px-4 py-2 text-left">Branch ID</th>
                  <th className="px-4 py-2 text-left">Branch Name</th>
                  <th className="px-4 py-2 text-left">Branch Location</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.EmployeeID} className="border-b border-gray-700">
                    <td className="px-4 py-2">{employee.EmployeeID}</td>
                    <td className="px-4 py-2">{employee.FirstName}</td>
                    <td className="px-4 py-2">{employee.LastName}</td>
                    <td className="px-4 py-2">{employee.Position}</td>
                    <td className="px-4 py-2">{employee.Salary}</td>
                    <td className="px-4 py-2">{employee.HireDate}</td>
                    <td className="px-4 py-2">{employee.BranchID}</td>
                    <td className="px-4 py-2">{employee.BranchName}</td>
                    <td className="px-4 py-2">{employee.BranchLocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white mt-6">No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowEmployees;
