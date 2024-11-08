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
      className="w-full bg-white h-[11rem] md:h-[13rem] rounded-xl p-[1.7rem] relative mb-[2rem] md:mb-0
      cursor-pointer hover:scale-[0.97] md:hover:scale-[1.05] transition-transform duration-300
      border-[1px] md:border-[2px] border-primaryColor border-dashed grid place-items-center
      "
      onClick={() => navigate(`/wallets/create`)}
    >
      <div className="size-[3rem] md:size-[4rem] bg-primaryColor grid place-items-center text-white">
        <>
          <PlusIcon size={24} className="block md:hidden" />{" "}
          <PlusIcon size={32} className="md:block hidden" />
        </>
      </div>
    </div>
  );
};

export default AddWalletCard;
