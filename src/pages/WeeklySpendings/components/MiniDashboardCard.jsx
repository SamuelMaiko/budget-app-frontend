import React from "react";

const MiniDashboardCard = ({ icon, title, cash }) => {
  return (
    <div
      className="bg-white w-full md:w-[20rem] h-[5rem] flex gap-2 border-b-[1px] border-r-[1px] 
border-gray-500 shadow-sm rounded-lg overflow-hidden "
    >
      <div className="bg-[rgba(0,123,255,0.5)] text-white h-full w-[5rem] grid place-items-center">
        {icon}
      </div>
      <div className="flex flex-col items-start gap-2 md:gap-0 pt-2 md:pt-0">
        <h1 className="text-[13px] md:text-lg font-semibold">{title}</h1>
        <h1 className="font-light md:font-semibold text-gray-500 text-[19px] md:text-sm">
          Ksh. {cash}
        </h1>
      </div>
    </div>
  );
};

export default MiniDashboardCard;
