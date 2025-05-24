

// import React, { useState } from 'react';
// import './Form.css';

// const ReportProblem = () => {
//   const [name, setName] = useState('');
//   const [problem, setProblem] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(`Problem Reported by: ${name}, Problem: ${problem}`);
//     // Add logic to handle problem reporting here
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

//       {/* Right section for report problem form */}
//       <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl text-[#a07a39] font-semibold">Report a Problem</h1>
//           <p className="text-lg text-gray-300">Please provide details about the problem.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-sm">
//           {/* Name Field */}
//           <div className="form-group">
//             <label htmlFor="Name" className="text-white font-medium">Name:</label>
//             <input
//               type="text"
//               id="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your name"
//               required
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//           </div>

//           {/* Problem Field */}
//           <div className="form-group">
//             <label htmlFor="Problem" className="text-white font-medium">Problem:</label>
//             <textarea
//               id="Problem"
//               value={problem}
//               onChange={(e) => setProblem(e.target.value)}
//               placeholder="Describe the problem"
//               required
//               className="p-3 w-full border border-gray-400 rounded-lg"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReportProblem;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import './Form.css';

const ReportProblem = () => {
  const [name, setName] = useState('');
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for the button
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is being submitted

    console.log(`Problem Reported by: ${name}, Problem: ${problem}`);

    // Simulate an API call for problem reporting (can replace with actual API call)
    setTimeout(() => {
      alert('Problem reported successfully!');
      console.log("Problem Reported:", { name, problem });

      // After successful submission, reset the form fields and redirect
      setName('');
      setProblem('');
      setLoading(false); // Set loading to false after the request is completed

      // Redirect to the customer dashboard
      navigate('/customer-dashboard');
    }, 2000); // Simulate network delay with setTimeout
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

      {/* Right section for report problem form */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10 overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-[#a07a39] font-semibold">Report a Problem</h1>
          <p className="text-lg text-gray-300">Please provide details about the problem.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-sm">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="Name" className="text-white font-medium">Name:</label>
            <input
              type="text"
              id="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          {/* Problem Field */}
          <div className="form-group">
            <label htmlFor="Problem" className="text-white font-medium">Problem:</label>
            <textarea
              id="Problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Describe the problem"
              required
              className="p-3 w-full border border-gray-400 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors mt-6"
          >
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportProblem;
