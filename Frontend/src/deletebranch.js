import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteBranch = () => {
  const [branchID, setBranchID] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!branchID) return alert("Branch ID is required!");

    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:5010/api/v1/branches/delete/${branchID}`);
      alert(response.data.message); // Shows browser alert
      setBranchID('');
     
        navigate('/admindashboard'); // Redirect after successful delete
    // Wait for the message before redirecting
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting branch'); // Browser alert for errors
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
        <div className="text-center mb-6">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Delete Branch</h1>
          <p className="text-lg text-gray-300">Enter the Branch ID below to delete</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDelete();
          }}
          className="flex flex-col gap-5 w-full max-w-sm"
        >
          <div>
            <label className="text-white font-medium">Branch ID</label>
            <input
              type="text"
              name="BranchID"
              value={branchID}
              onChange={(e) => setBranchID(e.target.value)}
              required
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-4"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Branch'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteBranch;
