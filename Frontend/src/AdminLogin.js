// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Form.css"; // For consistent styling

// const AdminLogin = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();

//   // Handle form submission
//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5010/api/v1/admin/login", // Backend endpoint
//         data
//       );

//       if (response.data.success) {
//         alert("Login successful");
//         console.log("Admin Data:", response.data.data);

//         // Redirect to admin-dashboard
//         navigate("/admindashboard");
//       } else {
//         alert(response.data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Error during login:", error.response?.data || error);
//       alert(error.response?.data?.message || "An error occurred during login");
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Admin Login</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Username Field */}
//         <div className="form-group">
//           <label htmlFor="Username">Username:</label>
//           <input
//             type="text"
//             id="Username"
//             {...register("Username", { required: "Username is required" })}
//           />
//           {errors.Username && <p className="error">{errors.Username.message}</p>}
//         </div>

//         {/* Password Field */}
//         <div className="form-group">
//           <label htmlFor="Password">Password:</label>
//           <input
//             type="password"
//             id="Password"
//             {...register("Password", { required: "Password is required" })}
//           />
//           {errors.Password && <p className="error">{errors.Password.message}</p>}
//         </div>

//         {/* Submit Button */}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;


import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5010/api/v1/admin/login", // Backend endpoint
        data
      );

      if (response.data.success) {
        alert("Login successful");
        console.log("Admin Data:", response.data.data);

        // Redirect to admin-dashboard
        navigate("/admindashboard");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error);
      alert(error.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left section for image (if needed, you can add a placeholder image like in LoginForm) */}
      <div className="w-full sm:w-7/12 h-full overflow-hidden">
        {/* Optional Image Section */}
         <img src="/bank.png" alt="Bank Image" className="w-full h-full object-cover" /> 
      </div>

      {/* Right section for login form */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-white">Admin Login</h1>
          <p className="text-lg text-gray-300">Enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm">
          {/* Username Field */}
          <label className="text-white">Username:</label>
          <input
            type="text"
            id="Username"
            placeholder="Enter your Username"
            {...register("Username", { required: "Username is required" })}
            className="p-3 rounded-lg border border-gray-400"
          />
          {errors.Username && <p className="text-red-500">{errors.Username.message}</p>}

          {/* Password Field */}
          <label className="text-white">Password:</label>
          <input
            type="password"
            id="Password"
            placeholder="Enter your password"
            {...register("Password", { required: "Password is required" })}
            className="p-3 rounded-lg border border-gray-400"
          />
          {errors.Password && <p className="text-red-500">{errors.Password.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
