import React from "react";
import { twMerge } from "tailwind-merge";

const RoundIconButtons = ({ icon, className }) => {
  return (
    <div
      className={twMerge(
        "rounded-full bg-[#eeeeee] text-primaryColor size-[1.5rem] flex items-center justify-center",
        className
      )}
    >
      {icon}
    </div>
  );
};

export default RoundIconButtons;
