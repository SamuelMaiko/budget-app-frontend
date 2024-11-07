import React, { useEffect, useState } from "react";
import WeekCard from "./WeekCard";
import { Plus } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import instance from "../../../axios/instance";
import { toast } from "react-toastify";
import { useWeekContext } from "../../../context/WeekContext";

const DisplayWeekSideBar = () => {
  const navigate = useNavigate();
  const { weeks, setWeeks } = useWeekContext();

  return (
    <div
      className=" w-[11rem] h-[100vh] md:h-full overflow-y-scroll bg-white md:bg-transparent
     md:sticky top-0 border-r-[1px] border-gray-300 pl-4 pr-4 md:pl-0 scrollble"
    >
      <div className="flex justify-between items-center mb-4 sticky top-0 z-10 md:bg-[#eeeeee] py-2">
        <p className="text-gray-500 uppercase md:normal-case  ">Weeks</p>
        <span
          onClick={() => navigate("/weeks/create")}
          className="border-[1px] border-gray-400 cursor-pointer rounded-md hover:bg-gray-300
         transition-colors duration-300"
        >
          <Plus size={20} className="text-black " />
        </span>
      </div>
      {weeks &&
        weeks.map((week) => {
          return <WeekCard key={week.id} week={week} />;
        })}
    </div>
  );
};

export default DisplayWeekSideBar;
