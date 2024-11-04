import React from "react";
import RoundIconButtons from "../../../GeneralComponents/RoundIconButtons";
import { ArrowRightLeft } from "lucide-react";

const ActionButtonCard = ({ icon, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-[7.4rem] flex flex-col items-center cursor-pointer 
    action-button hover:bg-gray-300 transition-colors duration-300 p-2"
    >
      <RoundIconButtons
        icon={icon}
        className="size-[3.8rem] bg-primaryColor text-white 
        action-button-round transition-opacity duration-300 "
      />
      <p className="whitespace-wrap leading-tight text-center text-[15px] mt-2">
        {title}
      </p>
    </div>
  );
};

export default ActionButtonCard;
