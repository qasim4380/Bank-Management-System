
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FiUsers, FiHome, FiCreditCard } from 'react-icons/fi';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [branchCount, setBranchCount] = useState(0);
//   const [employeeCount, setEmployeeCount] = useState(0);
//   const [transactionCount, setTransactionCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Fetch all data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch branches
//         const branchesResponse = await axios.get("http://localhost:5010/api/v1/branches/getall");
//         if (branchesResponse.data.success) {
//           setBranchCount(branchesResponse.data.totalBranches);
//         }

//         // Fetch employees
//         const employeesResponse = await axios.get("http://localhost:5010/api/v1/employees/getall");
//         if (employeesResponse.data.success) {
//           setEmployeeCount(employeesResponse.data.totalEmployees || employeesResponse.data.data.length);
//         }

//         // Fetch transactions
//         const transactionsResponse = await axios.get("http://localhost:5010/api/v1/transactions/getall");
//         if (transactionsResponse.data.success) {
//           setTransactionCount(transactionsResponse.data.totalTransactions);
//         }

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const navigateToService = (service) => {
//     navigate(`/admindashboard/${service}`);
//   };

//   const stats = [
//     { title: "Total Employees", value: loading ? "..." : employeeCount.toString(), icon: <FiUsers className="text-2xl" /> },
//     { title: "Total Branches", value: loading ? "..." : branchCount.toString(), icon: <FiHome className="text-2xl" /> },
//     { title: "Total Transactions", value: loading ? "..." : transactionCount.toString(), icon: <FiCreditCard className="text-2xl" /> },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-[#3d2a1d] text-white p-6">
//         <div className="container mx-auto">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
//               <p className="text-lg opacity-90 mt-1">Welcome back, Administrator</p>
//             </div>
//             <div className="hidden md:block">
//               <div className="bg-[#5a3e2b] px-4 py-2 rounded-full flex items-center">
//                 <span className="h-3 w-3 bg-green-400 rounded-full mr-2"></span>
//                 <span>Online</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Stats Cards - Now shows only 3 items */}
//       <div className="container mx-auto px-4 py-6 -mt-8">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           {stats.map((stat, index) => (
//             <div 
//               key={index}
//               className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
//             >
//               <div className="flex justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">{stat.title}</p>
//                   <p className="text-2xl font-bold text-[#3d2a1d] mt-1">{stat.value}</p>
//                 </div>
//                 <div className="bg-[#f8f4e8] p-3 rounded-lg text-[#5a3e2b]">
//                   {stat.icon}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 container mx-auto px-4 py-6">
//         {/* Employee Management */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <div className="flex items-center mb-4">
//             <FiUsers className="text-[#3d2a1d] text-xl mr-2" />
//             <h2 className="text-xl font-bold text-[#3d2a1d]">Employee Management</h2>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <MenuCard 
//               title="Add Employee" 
//               icon={<FiUsers className="mr-2" />}
//               onClick={() => navigateToService('add')} 
//             />
//             <MenuCard 
//               title="Delete Employee" 
//               icon={<FiUsers className="mr-2" />}
//               onClick={() => navigateToService('delete')} 
//             />
//             <MenuCard 
//               title="Update Employee" 
//               icon={<FiUsers className="mr-2" />}
//               onClick={() => navigateToService('update')} 
//             />
//             <MenuCard 
//               title="View Employees" 
//               icon={<FiUsers className="mr-2" />}
//               onClick={() => navigateToService('show')} 
//             />
//           </div>
//         </div>

//         {/* Branch Management */}
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <div className="flex items-center mb-4">
//             <FiHome className="text-[#3d2a1d] text-xl mr-2" />
//             <h2 className="text-xl font-bold text-[#3d2a1d]">Branch Management</h2>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <MenuCard 
//               title="Add Branch" 
//               icon={<FiHome className="mr-2" />}
//               onClick={() => navigateToService('addbranch')} 
//             />
//             <MenuCard 
//               title="Delete Branch" 
//               icon={<FiHome className="mr-2" />}
//               onClick={() => navigateToService('deletebranch')} 
//             />
//             <MenuCard 
//               title="Update Branch" 
//               icon={<FiHome className="mr-2" />}
//               onClick={() => navigateToService('updatebranch')} 
//             />
//             <MenuCard 
//               title="View Branches" 
//               icon={<FiHome className="mr-2" />}
//               onClick={() => navigateToService('showbranch')} 
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // MenuCard component remains the same
// const MenuCard = ({ title, icon, onClick }) => {
//   return (
//     <div 
//       className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-[#3d2a1d] 
//                 bg-white hover:bg-[#f8f4e8] transition-all duration-200 cursor-pointer
//                 shadow-sm hover:shadow-md group"
//       onClick={onClick}
//     >
//       <div className="bg-[#f8f4e8] group-hover:bg-[#3d2a1d] group-hover:text-white p-2 rounded-lg mr-3 transition-all">
//         {icon}
//       </div>
//       <span className="font-medium text-[#3d2a1d] group-hover:text-[#5a3e2b]">{title}</span>
//     </div>
//   );
// };

// export default AdminDashboard;











import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUsers, FiHome, FiCreditCard } from 'react-icons/fi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [branchCount, setBranchCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch all data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch branches
        const branchesResponse = await axios.get("http://localhost:5010/api/v1/branches/getall");
        if (branchesResponse.data.success) {
          setBranchCount(branchesResponse.data.totalBranches);
        }

        // Fetch employees
        const employeesResponse = await axios.get("http://localhost:5010/api/v1/employees/getall");
        if (employeesResponse.data.success) {
          setEmployeeCount(employeesResponse.data.totalEmployees || employeesResponse.data.data.length);
        }

        // Fetch transactions
        const transactionsResponse = await axios.get("http://localhost:5010/api/v1/transactions/getall");
        if (transactionsResponse.data.success) {
          setTransactionCount(transactionsResponse.data.totalTransactions);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToService = (service) => {
    navigate(`/admindashboard/${service}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header - Centered */}
      <header className="bg-[#3d2a1d] text-white p-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-lg opacity-90 mt-1">Welcome back, Administrator</p>
      </header>

      {/* Stats Cards - Centered with vertical layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
          {/* Total Employees */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full text-center">
            <p className="text-sm text-gray-500">Total Employees</p>
            <p className="text-4xl font-bold text-[#3d2a1d] mt-2">
              {loading ? "..." : employeeCount}
            </p>
          </div>

          {/* Total Branches */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full text-center">
            <p className="text-sm text-gray-500">Total Branches</p>
            <p className="text-4xl font-bold text-[#3d2a1d] mt-2">
              {loading ? "..." : branchCount}
            </p>
          </div>

          {/* Total Transactions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full text-center">
            <p className="text-sm text-gray-500">Total Transactions</p>
            <p className="text-4xl font-bold text-[#3d2a1d] mt-2">
              {loading ? "..." : transactionCount}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        {/* Employee Management */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-[#3d2a1d] mb-4 text-center">Employee Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MenuCard 
              title="Add Employee" 
              icon={<FiUsers className="mr-2" />}
              onClick={() => navigateToService('add')} 
            />
            <MenuCard 
              title="Delete Employee" 
              icon={<FiUsers className="mr-2" />}
              onClick={() => navigateToService('delete')} 
            />
            <MenuCard 
              title="Update Employee" 
              icon={<FiUsers className="mr-2" />}
              onClick={() => navigateToService('update')} 
            />
            <MenuCard 
              title="View Employees" 
              icon={<FiUsers className="mr-2" />}
              onClick={() => navigateToService('show')} 
            />
          </div>
        </div>

        {/* Branch Management */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#3d2a1d] mb-4 text-center">Branch Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MenuCard 
              title="Add Branch" 
              icon={<FiHome className="mr-2" />}
              onClick={() => navigateToService('addbranch')} 
            />
            <MenuCard 
              title="Delete Branch" 
              icon={<FiHome className="mr-2" />}
              onClick={() => navigateToService('deletebranch')} 
            />
            <MenuCard 
              title="Update Branch" 
              icon={<FiHome className="mr-2" />}
              onClick={() => navigateToService('updatebranch')} 
            />
            <MenuCard 
              title="View Branches" 
              icon={<FiHome className="mr-2" />}
              onClick={() => navigateToService('showbranch')} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// MenuCard component remains the same
const MenuCard = ({ title, icon, onClick }) => {
  return (
    <div 
      className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-[#3d2a1d] 
                bg-white hover:bg-[#f8f4e8] transition-all duration-200 cursor-pointer
                shadow-sm hover:shadow-md group"
      onClick={onClick}
    >
      <div className="bg-[#f8f4e8] group-hover:bg-[#3d2a1d] group-hover:text-white p-2 rounded-lg mr-3 transition-all">
        {icon}
      </div>
      <span className="font-medium text-[#3d2a1d] group-hover:text-[#5a3e2b]">{title}</span>
    </div>
  );
};

export default AdminDashboard;