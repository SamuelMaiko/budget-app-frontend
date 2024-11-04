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
          className={`uppercase bg-blue-400 text-white w-[3rem] grid place-items-center text-[14px] font-medium font-Montserrat
          
          `}
        >
          <p>{customDateForStatements(statement.created_at)[0]}</p>
          <p>{customDateForStatements(statement.created_at)[1]}</p>
          <p>{customDateForStatements(statement.created_at)[2]}</p>
        </div>
        <div className="pt-[1rem]">
          <h1 className="text-[16px] font-semibold">
            {statement.item_involved}
            {/* {statement.other_wallet.id == id
              ? `Transfer ${statement.type == "Debit" ? "to" : "from"}  ` +
                statement.wallet.name
              : statement.other_wallet.name == null
              ? "Deposit"
              : `Transfer ${statement.type == "Debit" ? "to" : "from"}  ` +
                statement.other_wallet.name} */}
          </h1>
          <p className="text-gray-400">
            {statement.description || "No description"}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between py-2 mr-8 items-end">
        <h1>
          <span className={`text-red-500  font-semibold `}>
            - {statement.amount}
          </span>{" "}
          KES
        </h1>
        <h1 className="text-sm">{getTwelveHrClock(statement.created_at)}</h1>
      </div>
    </div>
  );
};

export default StatementCard;
