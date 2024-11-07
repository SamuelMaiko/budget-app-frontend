import { Divider } from "keep-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNewCookie } from "../../../Cookies/Cookie";
import { SquarePen } from "lucide-react";
import { useWeekContext } from "../../../context/WeekContext";

const RemainingCashCard = ({ item }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setShowEditItemModal, setItemToEdit } = useWeekContext();

  return (
    <>
      <div className=" w-full flex items-center justify-between p-4 relative">
        <div className="flex items-center gap-4 text-gray-500">
          <div className="rounded-full bg-[#007BFF] size-[3.1rem] uppercase text-white place-items-center text-2xl hidden">
            E
          </div>
          <div>
            <h1 className="text-[13px] md:text-lg font-medium mb-2 uppercase md:normal-case font-semibold">
              Extra funds (unallocated)
            </h1>
            <div className="flex gap-4">
              {/* progress bar */}
              <div className="w-[37rem]  rounded-lg flex flex-col justify-center ">
                <div>
                  <FiguresDisplay
                    title={"Total extra funds"}
                    value={item.amount_allocated}
                  />
                  <FiguresDisplay title={"Spent"} value={item.amount_used} />
                  <FiguresDisplay
                    title={"Usage percentage"}
                    value={`${
                      Math.round(
                        (parseInt(item.amount_used, 10) /
                          parseInt(item.amount_allocated, 10)) *
                          100
                      ) || 0
                    }%`}
                  />
                  <FiguresDisplay
                    title={"Balance"}
                    value={
                      parseInt(item.amount_allocated, 10) -
                      parseInt(item.amount_used, 10)
                    }
                  />
                </div>

                {/* withdraw button */}
                <button
                  onClick={() => {
                    createNewCookie("itemToWithdrawFrom", item.name);
                    createNewCookie(
                      "itemRemainingAmount",
                      item.remaining_amount
                    );
                    navigate(`/week/${id}/item/${item.id}/withdraw`);
                  }}
                  className="bg-blue-500 hover:opacity-[0.7] transition-opacity duration-300 text-white
                    rounded-lg py-1 px-2 md:text-sm w-fit mt-2 uppercase text-[13px] md:normal-case"
                >
                  withdraw
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* edit button */}
        <SquarePen
          onClick={(e) => {
            e.stopPropagation();
            setItemToEdit(item);
            setShowEditItemModal(true);
          }}
          size={16}
          className={`absolute text-black top-1 right-0 cursor-pointer hover:scale-[1.05] transition-transform duration-300
            ${item.name == "Other" ? "hidden" : ""}
            `}
        />
      </div>
      <Divider />
    </>
  );
};

export default RemainingCashCard;

const FiguresDisplay = ({ title, value }) => {
  return (
    <p className="flex items-center justify-between w-[15rem] md:w-[20rem]">
      <span className="text-[13px] md:text-base">{title}:</span>
      <span className="font-light w-[5.5rem] text-[13px] text-base">
        <span className={`${title == "Usage percentage" ? "hidden" : ""}`}>
          Ksh.
        </span>{" "}
        {value}
      </span>
    </p>
  );
};
