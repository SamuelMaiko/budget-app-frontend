import { Divider } from "keep-react";
import { ArrowRightLeft, Edit, Ellipsis, Trash } from "lucide-react";
import React, { useState } from "react";
import RoundIconButtons from "../../../GeneralComponents/RoundIconButtons";
import { useNavigate } from "react-router-dom";
import { useWalletContext } from "../../../context/WalletContext";
import formatDate from "../../../formatters/formatDate";

const WalletCard = ({ wallet }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const navigate = useNavigate();
  const { setShowDeleteWalletModal, setCurrentWalletTheme, setWalletToDelete } =
    useWalletContext();

  return (
    // w-[30rem]
    <div
      className={`w-full bg-[${wallet.color_theme}] h-[13rem] rounded-xl p-[1.7rem] relative shadow-md cursor-pointer
       hover:scale-[1.05] transition-transform duration-300 text-white`}
      onClick={() => navigate(`/wallets/${wallet.id}`)}
    >
      <div className="flex justify-between">
        <h1 className="capitalize text-lg font-medium">{wallet.name}</h1>
        <button
          className="rounded-full hover:bg-neutral-500 p-[0.2rem]"
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropDown(true);
          }}
        >
          <Ellipsis size={22} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="uppercase font-medium">kes</span>
        <span className="font-Montserrat">{wallet.balance}</span>
      </div>
      <p className="text-sm absolute bottom-4">
        created on {formatDate(wallet.created_at)}
      </p>

      {/* dropdown */}
      <div
        onMouseEnter={() => setOpenDropDown(true)}
        onMouseLeave={() => setOpenDropDown(false)}
        className={`${
          !openDropDown ? "hidden" : ""
        } w-[9rem] h-fit rounded-lg bg-neutral-50 dark:bg-darkMode-bars
         absolute top-12  z-50 overflow-hidden border-[1px]
        right-0 text-black`}
      >
        {/* shadow-[-2px_2px_8px_rgba(0,0,0,0.1)] */}
        <>
          <a href="#">
            <button
              onClick={(e) => {
                // alert("downloaded");
                e.stopPropagation();
                navigate(`/wallets/${wallet.id}/transfer-funds`);
              }}
              className={`text-sm py-2 text-left w-full bg-white dark:text-white dark:hover:bg-darkMode-cardHover 
              hover:bg-gray-200 dark:bg-darkMode-body flex items-center gap-4 px-4 transition-colors duration-300 
              `}
            >
              <RoundIconButtons icon={<ArrowRightLeft size={14} />} />
              <p>Transfer</p>
            </button>
          </a>
          <Divider />
        </>
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // createNewCookie("walletToDelete", wallet.id);
              setWalletToDelete(wallet);
              setShowDeleteWalletModal(true);
            }}
            className={`text-sm py-2 text-left w-full bg-white dark:text-white dark:hover:bg-darkMode-cardHover 
              hover:bg-gray-200 dark:bg-darkMode-body flex items-center gap-4 px-4 transition-colors duration-300 
              ${wallet.name === "Weekly wallet" ? "hidden" : ""}
              `}
          >
            <RoundIconButtons icon={<Trash size={14} />} />
            <p>Delete</p>
          </button>
          <Divider />
        </>
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/wallets/${wallet.id}/edit`);
              setCurrentWalletTheme(wallet.color_theme);
            }}
            className={`text-sm py-2 text-left w-full bg-white dark:text-white dark:hover:bg-darkMode-cardHover 
              hover:bg-gray-200 dark:bg-darkMode-body flex items-center gap-4 px-4 transition-colors duration-300 `}
          >
            <RoundIconButtons icon={<Edit size={14} />} />
            <p>Edit</p>
          </button>
          <Divider />
        </>
      </div>
    </div>
  );
};

export default WalletCard;
