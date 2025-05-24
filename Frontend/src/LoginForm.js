

// export default LoginForm;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const sanitizedData = {
      CustomerID: data.CustomerID.trim(),
      Password: data.Password.trim(),
    };
    
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5010/api/v1/auth/login', sanitizedData);
      console.log('Login response:', response.data);
  
      if (response.data.success) {
        const { token, customer } = response.data; // Destructure `customer` object from response
        const CustomerID = customer.id; // Extract `CustomerID` from `customer.id`
        
        // Save data to local storage
        localStorage.setItem('CustomerID', CustomerID);
        localStorage.setItem('token', token);
       

        
        // Log the extracted values
        console.log('Customer ID:', CustomerID);
        console.log('Customer Details:', customer);
  
        alert('Login successful!');
        navigate('/customer-dashboard'); // Navigate to dashboard
      } else {
        alert(response.data.message || 'Invalid Customer ID or Password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'An error occurred during login.');
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

      {/* Right section for login form */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-white">Login</h1>
          <p className="text-lg text-gray-300">Enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
          <label className="text-white">Customer ID:</label>
          <input
            type="text"
            placeholder="Enter your Customer ID"
            {...register('CustomerID', {
              required: 'Customer ID is required',
              pattern: {
                value: /^[0-9]+$/, // Allow only numeric Customer IDs
                message: 'Customer ID must be numeric.',
              },
            })}
            className="p-3 rounded-lg border border-gray-400"
          />
          {errors.CustomerID && <p className="text-red-500">{errors.CustomerID.message}</p>}

          <label className="text-white">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register('Password', { required: 'Password is required' })}
            className="p-3 rounded-lg border border-gray-400"
          />
          {errors.Password && <p className="text-red-500">{errors.Password.message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-redirect mt-4">
          <p className="text-white">Don't have an account?</p>
          <button
            className="login-button mt-2 px-6 py-3 text-white bg-[#a07a39] rounded-lg hover:bg-[#8c6530] transition-colors"
            onClick={() => navigate('/signup/customer')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
