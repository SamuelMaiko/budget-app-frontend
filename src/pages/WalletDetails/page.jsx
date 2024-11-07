import React, { useEffect, useState } from "react";
import ActionButtonCard from "./components/ActionButtonCard";
import { ArrowRightLeft, CircleDollarSign } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getWalletDetails } from "../EditWallet/api/walletdetails";
import WalletTransactions from "./components/WalletTransactions";

const WalletDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [WalletDetails, setWalletDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getWalletDetails(id).then((response) => setWalletDetails(response));
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll md:scrollble remove-scrollbar">
      <div className="w-[88%] md:w-[75%] mx-auto h-full">
        <div className="md:bg-primaryColor text-black md:text-white py-[0.65rem] md:py-[2rem]   top-0 z-20">
          <h1 className="text-center text-lg md:text-xl uppercase md:normal-case font-light md:font-semibold ">
            My wallets
          </h1>
          <h1 className="uppercase text-[13px] font-medium mt-1 md:mt-[1rem] md:mb-[5rem] flex md:hidden flex-col items-center">
            {WalletDetails.name}
          </h1>
        </div>
        <div className="py-[1rem] md:py-[1.6rem]">
          <h1 className="text-[13px] md:text-lg text-gray-400 text-center ">
            Available balance
          </h1>
          <div className="flex items-center justify-center gap-2 text-xl md:font-medium font-light">
            <span className="uppercase ">ksh.</span>
            <span className="">{WalletDetails && WalletDetails.balance}</span>
          </div>
        </div>

        <div className="flex gap-2 md:gap-[2.1rem] mt-[2rem] md:mt-0">
          <ActionButtonCard
            onClick={() => navigate("transfer-funds")}
            icon={
              <>
                <ArrowRightLeft size={18} className="block md:hidden" />{" "}
                <ArrowRightLeft size={22} className="md:block hidden" />
              </>
            }
            title="Transfer funds"
          />
          <ActionButtonCard
            onClick={() => navigate("deposit")}
            icon={
              <>
                <CircleDollarSign size={18} className="block md:hidden" />{" "}
                <CircleDollarSign size={22} className="md:block hidden" />
              </>
            }
            title="Deposit"
          />
        </div>
        <div className="flex justify-between items-center mt-[3rem] mb-[1rem]">
          <h1 className="text-[13px] uppercase md:normal-case text-gray-600 md:text-xl font-medium md:font-semibold ">
            Transactions
          </h1>
          <button
            onClick={() => alert("Coming soon!")}
            className="text-primaryColor py-1 px-4 hover:bg-[#FFF4E0] text-[13px] md:text-base uppercase md:normal-case font-medium"
          >
            See all
          </button>
        </div>
        <WalletTransactions />
      </div>
    </div>
  );
};

export default WalletDetails;
