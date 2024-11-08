import React from "react";
import WeekItemCard from "./WeekItemCard";
import RemainingCashCard from "./RemainingCashCard";

const WeekItems = ({ expenseItems }) => {
  return (
    <>
      <div className=" bg-white md:px-5 rounded-lg shadow-lg overflow-hidden">
        {expenseItems &&
          expenseItems.map((item) => {
            if (item.name !== "Other")
              return <WeekItemCard key={item.id} item={item} />;
          })}
      </div>
      <div className=" bg-white px-5 rounded-lg shadow-lg mt-[4rem] md:mt-5 overflow-hidden">
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
