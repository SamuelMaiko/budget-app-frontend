import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWeekContext } from "../../../context/WeekContext";

const WeekCard = ({ week }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setShowWeekSidebar } = useWeekContext();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/weeks/${week.id}`);
        setShowWeekSidebar(false);
      }}
      className={`w-full border-[1px] border-gray-300 font-semibold py-2 rounded-lg 
    text-black hover:opacity-[0.7] cursor-pointer transition-colors duration-300 mb-3 relative
    ${
      id == week.id ? "bg-gray-300" : "bg-white"
    } transition-opacity duration-300
    `}
    >
      <p className="text-center text-[13px] md:text-[14px] font-normal">
        {week.name}
      </p>
      <p
        className={`${
          week.is_last ? "" : "hidden"
        } bg-[#007BFF] text-white text-[10px] absolute top-0 right-2 font-normal rounded-md px-[3px]`}
      >
        New
      </p>
    </div>
  );
};

export default WeekCard;
