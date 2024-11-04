import React from "react";
import WeekItemCard from "./WeekItemCard";

const WeekItems = ({ expenseItems }) => {
  return (
    <div className=" bg-white p-5 rounded-lg shadow-lg">
      {expenseItems &&
        expenseItems.map((item) => {
          return <WeekItemCard key={item.id} item={item} />;
        })}
    </div>
  );
};

export default WeekItems;
