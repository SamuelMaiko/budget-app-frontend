import React from "react";
import { useParams } from "react-router-dom";
import { getTwelveHrClock } from "../../../formatters/getTwelveHrClock";
import { customDateForStatements } from "../../../formatters/customDateForStatements";
// import { customDateForStatements } from "../../../formatters/customDateForStatements";

const StatementCard = ({ statement }) => {
  const { id } = useParams();
  return (
    <div className="flex justify-between border-b-[1px] border-gray-200 h-[5rem]">
      <div className="flex gap-3 ">
        <div
          className={`uppercase bg-blue-400 text-white px-1 md:px-0 md:w-[3rem]
             grid place-items-center md:text-[14px] text-[11px] font-normal md:font-medium 
          
          `}
        >
          <p>{customDateForStatements(statement.created_at)[0]}</p>
          <p>{customDateForStatements(statement.created_at)[1]}</p>
          <p>{customDateForStatements(statement.created_at)[2]}</p>
        </div>
        <div className="pt-[1rem]">
          <h1 className="text-[13px] md:text-[16px] text-gray-500 font-semibold">
            {statement.item_involved === "Other"
              ? `[EXTRA EXPENSES]`
              : statement.item_involved}
          </h1>
          <p className="text-gray-400 text-[12px] md:text-sm ">
            {statement.description || "No description"}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between py-2 mr-2 md:mr-8 items-end">
        <h1>
          <span
            className={`text-red-500  font-semibold text-[13px] md:text-[16px]`}
          >
            - <span className="text-xs md:text-base">KSH. </span>
            {statement.amount}
          </span>{" "}
        </h1>
        <h1 className="text-xs text-gray-500 md:text-sm">
          {getTwelveHrClock(statement.created_at)}
        </h1>
      </div>
    </div>
  );
};

export default StatementCard;
