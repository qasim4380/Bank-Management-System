import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateBranch = () => {
  const [branchID, setBranchID] = useState('');
  const [formData, setFormData] = useState({
    BranchName: '',
    Location: '',
    Phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For redirect

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!branchID) return alert("Branch ID is required!");
    
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5010/api/v1/branches/update/${branchID}`, formData);
      alert(response.data.message); // Show success message in a browser alert
      setBranchID('');
      setFormData({ BranchName: '', Location: '', Phone: '' });
      
        navigate('/admindashboard'); // Redirect after successful update
    // Wait for the message before redirecting
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating branch'); // Show error message in a browser alert
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
          <h1 className="text-4xl text-[#a07a39] font-semibold">Update Branch</h1>
          <p className="text-lg text-gray-300">Update branch details below</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
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

          <div>
            <label className="text-white font-medium">Branch Name</label>
            <input
              type="text"
              name="BranchName"
              value={formData.BranchName}
              onChange={handleChange}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          <div>
            <label className="text-white font-medium">Location</label>
            <input
              type="text"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          <div>
            <label className="text-white font-medium">Phone</label>
            <input
              type="text"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-4"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Branch'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBranch;
