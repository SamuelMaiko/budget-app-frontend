import React from "react";
import { twMerge } from "tailwind-merge";

const MobileNavLink = ({ icon, name, onClick, className }) => {
  return (
    <li
      onClick={onClick}
      className={twMerge(
        `font-semibold hover:text-primaryColor cursor-pointer transition-colors duration-300 
        flex flex-col gap-1 items-center  overflow-hidden`,
        className
      )}
    >
      <span>{icon}</span>
      <span className="text-[12px] font-normal transition-colors duration-300">
        {name}
      </span>
    </li>
  );
};

export default MobileNavLink;
