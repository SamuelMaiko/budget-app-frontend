import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  ChevronDown,
  HandCoins,
  ReceiptCent,
  Settings,
} from "lucide-react";
import MiniDashboardCard from "./components/MiniDashboardCard";
import Usage from "./components/Usage";
import WeekItems from "./components/WeekItems";
import WeekStatements from "./components/WeekStatements";
import DisplayWeekSideBar from "./components/DisplayWeekSideBar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../axios/instance";
import { useWeekContext } from "../../context/WeekContext";
import { getWeekDetails } from "./api/getWeekDetails";

const WeeklySpendings = () => {
  const navigate = useNavigate();
  const {
    expenseItems,
    setExpenseItems,
    weekDetails,
    setWeekDetails,
    showWeekSidebar,
    setShowWeekSidebar,
  } = useWeekContext();
  const { id } = useParams();

  useEffect(() => {
    getWeekDetails(id).then((response) => {
      setWeekDetails(response);
      setExpenseItems(response && response.expense_items);
    });
  }, [id]);

  return (
    <div className="w-full min-h-screen">
      <div className="w-[88%] md:w-[75%] mx-auto h-screen flex ">
        <div
          onClick={() => setShowWeekSidebar(false)}
          className={`fixed md:static md:block h-[100vh] bg-[rgba(0,0,0,0.2)] md:bg-transparent z-30 md:h-full pb-[6rem] top-0
         left-0 md:pl-[1rem] w-full md:w-fit ${
           showWeekSidebar ? "" : "-translate-x-[100vw] md:translate-x-0"
         } transition-transform duration-500`}
        >
          <DisplayWeekSideBar />
        </div>
        <div className="w-full h-full md:pl-[1rem] overflow-y-scroll remove-scrollbar">
          <div className="md:bg-primaryColor text-black md:text-white py-[0.65rem] md:py-[2rem]   top-0 z-20">
            <h1 className="text-center text-lg md:text-xl uppercase md:normal-case font-light md:font-semibold ">
              Weekly spendings
            </h1>
          </div>
          {/* show on mobile */}
          <div
            onClick={() => setShowWeekSidebar(true)}
            className="uppercase text-[13px] font-medium mt-[1rem] mb-[2rem] md:mb-[5rem] flex md:hidden flex-col items-center"
          >
            <span>{weekDetails && weekDetails.name}</span>
            <ChevronDown size={16} />
          </div>
          {/* show on desktop */}
          <h1
            onClick={() => setShowWeekSidebar(true)}
            className="uppercase text-xl font-medium mt-[1rem] mb-[2rem] md:mb-[5rem] text-center hidden md:block"
          >
            {weekDetails && weekDetails.name}
          </h1>
          <div className="flex md:flex-row flex-col gap-4 md:gap-8">
            <MiniDashboardCard
              title="Total expenses"
              cash={weekDetails && weekDetails.total_expenses}
              icon={<HandCoins size={28} />}
            />
            <MiniDashboardCard
              title="Used cash"
              cash={weekDetails && weekDetails.used_cash}
              icon={<ReceiptCent size={28} />}
            />
            <Usage
              totalExpenses={weekDetails && weekDetails.total_expenses}
              usedCash={weekDetails && weekDetails.used_cash}
            />
          </div>
          <h1 className="text-[15px] text-gray-600 uppercase md:normal-case md:text-2xl font-semibold mt-[4rem] md:mt-[2rem] mb-[1rem]">
            Items
          </h1>
          <button
            onClick={() => navigate(`/weeks/${id}/manage-items`)}
            className="flex items-center gap-2 py-1 px-3 border-[1px] border-gray-300 rounded-xl mb-[1rem] md:mb-[2rem] 
          text-[13px] md:text-[16px] hover:bg-gray-200 transition-colors duration-300"
          >
            <Settings size={18} /> Manage items
          </button>

          {/* no items found div */}
          <div
            className={`pb-5 mb-[3rem] md:mb-0 ${
              expenseItems.length == 1 ? "" : "hidden"
            }`}
          >
            <p className="text-[14px] text-gray-600 md:text-xl ">
              No items are added to this week!
            </p>
          </div>
          <WeekItems expenseItems={expenseItems} />
          <WeekStatements />
        </div>
      </div>
    </div>
  );
};

export default WeeklySpendings;
