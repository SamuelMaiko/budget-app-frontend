import { Divider } from "keep-react";
import { ArrowRightLeft, Ellipsis, PlusIcon, Trash } from "lucide-react";
import React, { useState } from "react";
import RoundIconButtons from "../../../GeneralComponents/RoundIconButtons";
import { useNavigate } from "react-router-dom";
import { useWalletContext } from "../../../context/WalletContext";

const AddWalletCard = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const navigate = useNavigate();
  const { setShowDeleteWalletModal } = useWalletContext();

  return (
    // w-[30rem]
    <div
      className="w-full bg-white h-[13rem] rounded-xl p-[1.7rem] relative 
      cursor-pointer hover:scale-[1.05] transition-transform duration-300
      border-[2px] border-primaryColor border-dashed grid place-items-center
      "
      onClick={() => navigate(`/wallets/create`)}
    >
      <div className="size-[4rem] bg-primaryColor grid place-items-center text-white">
        <PlusIcon size={32} />
      </div>
    </div>
  );
};

export default AddWalletCard;
