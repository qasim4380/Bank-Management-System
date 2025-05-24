import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowBranch = () => {
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('http://localhost:5010/api/v1/branches/getall'); // Replace with your actual API endpoint
        setBranches(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching branches');
      }
    };

    fetchBranches();
  }, []);

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

      {/* Right side branch list */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Branches List</h1>
          <p className="text-lg text-gray-300">List of all branches below</p>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Branches List */}
        <ul className="w-full max-w-lg space-y-4">
          {branches.length > 0 ? (
            branches.map((branch) => (
              <li key={branch.BranchID} className="bg-[#4a2d1b] p-4 rounded-lg shadow-lg">
                <h3 className="text-2xl text-[#a07a39] font-semibold">{branch.BranchName}</h3>
                <p className="text-white">Location: {branch.Location}</p>
                <p className="text-white">Phone: {branch.Phone}</p>
                <p className="text-white">Total Employees: {branch.TotalEmployees}</p>
              </li>
            ))
          ) : (
            <p className="text-white">No branches found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ShowBranch;
