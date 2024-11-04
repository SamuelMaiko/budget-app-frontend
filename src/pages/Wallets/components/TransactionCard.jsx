import React from "react";
import { useParams } from "react-router-dom";
import { getTwelveHrClock } from "../../../formatters/getTwelveHrClock";
import { customDateForStatements } from "../../../formatters/customDateForStatements";
// import { customDateForStatements } from "../../../formatters/customDateForStatements";

const TransactionCard = ({ transaction }) => {
  const { id } = useParams();
  return (
    <div className="flex justify-between border-b-[1px] border-gray-200 h-[5rem]">
      <div className="flex gap-3 ">
        <div
          className={`uppercase bg-primaryColor text-white w-[3rem] grid place-items-center text-[14px] font-medium font-Montserrat
          
          `}
        >
          <p>{customDateForStatements(transaction.created_at)[0]}</p>
          <p>{customDateForStatements(transaction.created_at)[1]}</p>
          <p>{customDateForStatements(transaction.created_at)[2]}</p>
        </div>
        <div className="pt-[1rem]">
          <h1 className="text-[16px] font-semibold">
            {transaction.other_wallet.id == id
              ? `Transfer ${transaction.type == "Debit" ? "to" : "from"}  ` +
                transaction.wallet.name
              : transaction.other_wallet.name == null
              ? "Deposit"
              : `Transfer ${transaction.type == "Debit" ? "to" : "from"}  ` +
                transaction.other_wallet.name}
          </h1>
          <p className="text-gray-400">
            {transaction.description || "No description"}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between py-2 mr-8 items-end">
        <h1>
          <span
            className={`${
              transaction.type == "Debit" ? "text-red-500" : "text-green-500"
            } font-semibold `}
          >
            {transaction.type == "Debit" ? "-" : "+"}
            {transaction.amount}
          </span>{" "}
          KES
        </h1>
        <h1 className="text-sm">{getTwelveHrClock(transaction.created_at)}</h1>
      </div>
    </div>
  );
};

export default TransactionCard;
