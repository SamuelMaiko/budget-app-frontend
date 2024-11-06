import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNewCookie } from "../../../Cookies/Cookie";

const WalletMiniCard = ({ wallet }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      {/* to appear on mobile devices */}
      <div
        onClick={() => {
          navigate(`/wallets/${id}/transfer-funds/amount`);
          // STORING IN COOKIE TO USE LATER
          createNewCookie("walletToTransferFundsTo", wallet.id);
        }}
        className="flex md:hidden justify-between py-[1.2rem] px-[2rem] bg-white shadow-md rounded-2xl"
      >
        <div className="flex items-center gap-4 ">
          <div
            className={`uppercase rounded-full bg-[${wallet.color_theme}] text-white size-[2.5rem] grid place-items-center 
        font-semibold text-lg`}
          >
            {wallet.name[0]}
          </div>
          <p className="capitalize font-medium">{wallet.name}</p>
        </div>
      </div>
      {/* to appear on desktop and medium screens */}
      <div
        onClick={() => {
          createNewCookie("walletToTransferFundsTo", wallet.id);
        }}
        className="justify-between py-[1.2rem] px-[2rem] bg-white shadow-md rounded-2xl hidden lg:flex"
      >
        <div className="flex items-center gap-4 ">
          <div
            className={`uppercase rounded-full bg-[${wallet.color_theme}] text-white size-[2.5rem] grid place-items-center 
        font-semibold text-lg`}
          >
            {wallet.name[0]}
          </div>
          <p className="capitalize font-medium">{wallet.name}</p>
        </div>
        <button
          onClick={() => navigate(`/wallets/${id}/transfer-funds/amount`)}
          className="bg-primaryColor py-1 px-4 hover:opacity-[0.8] transition-opacity duration-300 text-white rounded-xl"
        >
          Select
        </button>
      </div>
    </>
  );
};

export default WalletMiniCard;
