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
        <div
          className={`bg-[${WalletDetails.color_theme}]  top-0 text-white pb-[2rem]`}
        >
          <h1 className="text-center text-xl font-semibold mb-[1rem] md:mb-[3.5rem]">
            My wallets
          </h1>
          <h1 className="text-center text-[17px] md:text-2xl font-medium capitalize mb-[2rem] md:mb-0">
            {WalletDetails.name}
          </h1>
        </div>
        <div className="py-[1.6rem]">
          <h1 className="text-lg text-gray-400 text-center ">
            Available balance
          </h1>
          <div className="flex items-center justify-center gap-2 text-xl">
            <span className="uppercase font-medium">kes</span>
            <span className="font-Montserrat">
              {WalletDetails && WalletDetails.balance}
            </span>
          </div>
        </div>

        <div className="flex md:gap-[2.1rem]">
          <ActionButtonCard
            onClick={() => navigate("transfer-funds")}
            icon={<ArrowRightLeft size={22} />}
            title="Transfer funds"
          />
          <ActionButtonCard
            onClick={() => navigate("deposit")}
            icon={<CircleDollarSign size={22} />}
            title="Deposit"
          />
        </div>
        <div className="flex justify-between items-center mt-[3rem] mb-[1rem]">
          <h1 className="text-xl font-Montserrat font-semibold ">
            Transactions
          </h1>
          <button
            onClick={() => alert("Coming soon!")}
            className="text-primaryColor py-1 px-4 hover:bg-[#FFF4E0]"
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
