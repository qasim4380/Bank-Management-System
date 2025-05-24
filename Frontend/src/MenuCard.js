// import React from 'react';
// import './MenuCard.css';

// const MenuCard = ({ title, onClick }) => {
//   return (
//     <div className="menu-card" onClick={onClick}>
//       {title}
//     </div>
//   );
// };

// export default MenuCard;


import React from 'react';

const MenuCard = ({ title, onClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-[#f0e0b6]" onClick={onClick}>
      <h4 className="text-center text-xl text-[#3d2a1d] font-semibold">{title}</h4>
      <button
        className="mt-4 px-6 py-3 text-white bg-[#a07a39] rounded-lg hover:bg-[#8c6530] transition-colors w-full"
        onClick={onClick}
      >
        Select
      </button>
    </div>
  );
};

export default MenuCard;
