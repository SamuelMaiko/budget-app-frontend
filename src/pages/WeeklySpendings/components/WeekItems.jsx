import React from "react";
import WeekItemCard from "./WeekItemCard";
import RemainingCashCard from "./RemainingCashCard";

const WeekItems = ({ expenseItems }) => {
  return (
    <>
      <div className=" bg-white px-5 rounded-lg shadow-lg ">
        {expenseItems &&
          expenseItems.map((item) => {
            if (item.name !== "Other")
              return <WeekItemCard key={item.id} item={item} />;
          })}
      </div>
      <div className=" bg-white px-5 rounded-lg shadow-lg mt-5">
        {expenseItems &&
          expenseItems.map((item) => {
            if (item.name === "Other")
              return <RemainingCashCard key={item.id} item={item} />;
          })}
      </div>
    </>
  );
};

export default WeekItems;
