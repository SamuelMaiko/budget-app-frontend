import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const Usage = ({ totalExpenses, usedCash }) => {
  const percentage = Math.round(
    !(usedCash / totalExpenses) ? 0 : (usedCash / totalExpenses) * 100
  );
  return (
    <div className="flex items-center mt-[2rem] md:mt-0">
      <p className="text-[13px] md:text-lg font-semibold text-gray-600 mr-4 md:mr-2">
        Usage
      </p>
      <div className="h-[4rem] md:h-[5rem]">
        <CircularProgressbar
          value={isNaN(percentage) ? 100 : percentage}
          // value={100}
          // text={`${percentage === 0 ? 100 : percentage}%`}
          text={`${isNaN(percentage) ? 100 : percentage}%`}
          // text={`${percentage === 0 ? 100 : percentage}%`}
          className="h-full "
          styles={buildStyles({
            pathColor: `rgba(0, 123, 255, ${
              isNaN(percentage) ? 100 / 100 : percentage / 100
            })`,
            textColor: "#007BFF",
            backgroundColor: "red",
            trailColor: "#d6d6d6",
          })}
        />
      </div>
    </div>
  );
};

export default Usage;
