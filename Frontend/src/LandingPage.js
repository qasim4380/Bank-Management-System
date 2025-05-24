// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LandingPage.css';

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="landing-container">
//       <div className="landing-header">
//         <h1>Welcome to Our Platform</h1>
//         <p>Please select your user type to proceed</p>
//       </div>
//       <div className="landing-buttons">
//         <button onClick={() => navigate('/signup/customer')} className="landing-button customer">
//           Customer
//         </button>
//         <button onClick={() => navigate('/login/admin')} className="landing-button admin">
//           Admin
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex h-screen w-full">
//       {/* Left section for image */}
//       <div className="w-7/10 h-full overflow-hidden">
//         <img 
//           src="bank.png" 
//           alt="Bank Image" 
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Right section for text and buttons */}
//       <div className="w-3/10 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl text-white">Welcome to SQA BankPro</h1>
//           <p className="text-lg text-gray-300">Please select your user type to proceed</p>
//         </div>

//         <div className="flex flex-col gap-6">
//           <button 
//             onClick={() => navigate('/signup/customer')} 
//             className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors"
//           >
//             Customer
//           </button>
//           <button 
//             onClick={() => navigate('/login/admin')} 
//             className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors"
//           >
//             Admin
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full">
      {/* Left section for image */}
      <div className="w-full sm:w-7/12 h-full overflow-hidden">
        <img
          src="bank.png"
          alt="Bank Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right section for text and buttons */}
      <div className="w-full sm:w-5/12 h-full bg-[#3d2a1d] flex flex-col justify-center items-center p-8 sm:p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-white">Welcome to SQA BankPro</h1>
          <p className="text-lg text-gray-300">Please select your user type to proceed</p>
        </div>

        <div className="flex flex-col gap-6">
          <button
            onClick={() => navigate('/signup/customer')}
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors"
          >
            Customer
          </button>
          <button
            onClick={() => navigate('/login/admin')}
            className="px-6 py-3 text-xl font-semibold bg-[#a07a39] text-white rounded-lg hover:bg-[#8c6530] transition-colors"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
