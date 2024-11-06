import React, { useEffect, useState } from "react";
import { HandCoins, ReceiptCent, Settings } from "lucide-react";
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
  const { expenseItems, setExpenseItems, weekDetails, setWeekDetails } =
    useWeekContext();
  const { id } = useParams();

  useEffect(() => {
    getWeekDetails(id).then((response) => {
      setWeekDetails(response);
      setExpenseItems(response.expense_items);
    });
  }, [id]);

  return (
    <div className="w-full min-h-screen">
      <div className="w-[75%] mx-auto h-screen flex ">
        <div className="">
          <DisplayWeekSideBar />
        </div>
        <div className="w-full h-full pl-[1rem] overflow-y-scroll remove-scrollbar">
          <div className="bg-primaryColor text-white py-[2rem] mb-[1.3rem] sticky top-0 z-20">
            <h1 className="text-center text-xl font-semibold ">
              Weekly spendings
            </h1>
          </div>
          <h1 className="uppercase text-xl font-medium mt-[1rem] mb-[5rem] text-center">
            {weekDetails.name}
          </h1>
          <div className="flex gap-8">
            <MiniDashboardCard
              title="Total expenses"
              cash={weekDetails.total_expenses}
              icon={<HandCoins size={32} />}
            />
            <MiniDashboardCard
              title="Used cash"
              cash={weekDetails.used_cash}
              icon={<ReceiptCent size={32} />}
            />
            <Usage
              totalExpenses={weekDetails.total_expenses}
              usedCash={weekDetails.used_cash}
            />
          </div>
          <h1 className="text-2xl font-Montserrat font-semibold mt-[2rem] mb-[1rem]">
            Items
          </h1>
          <button
            onClick={() => navigate(`/weeks/${id}/manage-items`)}
            className="flex items-center gap-2 py-1 px-3 border-[1px] border-gray-300 rounded-xl mb-[2rem] 
          text-[16px] hover:bg-gray-200 transition-colors duration-300"
          >
            <Settings size={18} /> Manage items
          </button>
          <WeekItems expenseItems={expenseItems} />
          <WeekStatements />
        </div>
      </div>
    </div>
  );
};

export default WeeklySpendings;
