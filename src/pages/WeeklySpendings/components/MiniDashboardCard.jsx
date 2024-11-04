import React from "react";

const MiniDashboardCard = ({ icon, title, cash }) => {
  return (
    <div
      className="bg-white w-[20rem] h-[5rem] flex gap-2 border-b-[1px] border-r-[1px] 
border-gray-500 shadow-sm rounded-lg overflow-hidden "
    >
      <div className="bg-[rgba(0,123,255,0.5)] text-white h-full w-[5rem] grid place-items-center">
        {icon}
      </div>
      <div className="flex flex-col items-start">
        <h1 className="text-lg font-semibold">{title}</h1>
        <h1 className="font-semibold text-gray-500 text-sm">KES {cash}</h1>
      </div>
    </div>
  );
};

export default MiniDashboardCard;
