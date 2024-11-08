import { Divider } from "keep-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNewCookie } from "../../../Cookies/Cookie";
import { LogOut, SquarePen } from "lucide-react";
import { useWeekContext } from "../../../context/WeekContext";

const WeekItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setShowEditItemModal, setItemToEdit } = useWeekContext();

  return (
    <>
      <div className=" w-full flex items-center justify-between p-3 md:p-4 relative">
        <div className="flex items-center gap-4 ">
          <div
            className="rounded-full bg-[#007BFF] size-[2.7rem] md:size-[3.1rem] uppercase text-white
           grid place-items-center md:text-2xl text-xl"
          >
            {item.name.split("")[0]}
          </div>
          <div>
            <h1 className="text-[12px] md:text-[15px] md:text-lg md:font-medium font-semibold text-gray-600 md:text-black uppercase md:capitalize">
              {item.name}
            </h1>
            <div className="flex flex-col md:flex-row gap-4">
              {/* progress bar */}
              <div className="w-[12rem] md:w-[37rem] h-[0.7rem] md:h-[1rem] bg-neutral-200 rounded-lg flex items-center mt-1">
                <div
                  className="h-[0.7rem] md:h-[1rem] bg-primaryColor rounded-lg flex items-center pl-1 text-[11px] md:text-[15px]
                   font-semibold whitespace-nowrap text-black"
                  style={{
                    width: `calc(${
                      Math.round(
                        (parseInt(item.amount_used, 10) /
                          parseInt(item.amount_allocated, 10)) *
                          100
                      ) || 0
                    }% )`,
                  }}
                >
                  used{" "}
                  {Math.round(
                    (parseInt(item.amount_used, 10) /
                      parseInt(item.amount_allocated, 10)) *
                      100
                  ) || 0}
                  %
                </div>
              </div>
              {/* right section */}
              <div className="text-[12px] md:text-sm flex items-center">
                <h1 className="font-medium">
                  {parseInt(item.amount_used, 10)}/
                  {parseInt(item.amount_allocated, 10)}
                </h1>
                {/* <h1 className="text-xs">rem- {amount_allocated - amount_used}</h1> */}
                <span className=" text-xs font-semibold text-red-500 pl-5">
                  (
                  {parseInt(item.amount_allocated, 10) -
                    parseInt(item.amount_used, 10)}
                  )
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* withdraw button for desktop */}
        <button
          onClick={() => {
            createNewCookie("itemToWithdrawFrom", item.name);
            createNewCookie("itemRemainingAmount", item.remaining_amount);
            navigate(`/week/${id}/item/${item.id}/withdraw`);
          }}
          className="bg-red-500 hover:opacity-[0.7] transition-opacity duration-300 text-white
         rounded-lg py-1 px-2 text-sm hidden md:block "
        >
          withdraw
        </button>
        {/* withdraw button for mobile devices */}
        <button
          onClick={() => {
            createNewCookie("itemToWithdrawFrom", item.name);
            createNewCookie("itemRemainingAmount", item.remaining_amount);
            navigate(`/week/${id}/item/${item.id}/withdraw`);
          }}
          className="bg-red-500 hover:opacity-[0.7] transition-opacity duration-300 text-white
         rounded-full p-1 text-sm md:hidden block "
        >
          <LogOut size={14} className="" />
        </button>
        {/* edit button */}
        <SquarePen
          onClick={(e) => {
            e.stopPropagation();
            setItemToEdit(item);
            setShowEditItemModal(true);
          }}
          size={12}
          className={`absolute text-black top-2 right-2 md:right-0 cursor-pointer hover:scale-[1.05] transition-transform duration-300 md:hidden
            ${item.name == "Other" ? "hidden" : ""}
            `}
        />
        <SquarePen
          onClick={(e) => {
            e.stopPropagation();
            setItemToEdit(item);
            setShowEditItemModal(true);
          }}
          size={16}
          className={`absolute text-black top-2 right-2 md:right-0 cursor-pointer hover:scale-[1.05] transition-transform duration-300 hidden md:block
            ${item.name == "Other" ? "hidden" : ""} 
            `}
        />
      </div>
      <Divider />
    </>
  );
};

export default WeekItemCard;
