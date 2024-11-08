import React, { useEffect, useState } from "react";
import MyWalletsList from "./components/MyWalletsList";
import instance from "../../axios/instance";
import { toast } from "react-toastify";
import { getWallets } from "./api/getWallets";
import { useWalletContext } from "../../context/WalletContext";

const Wallets = () => {
  const [loading, setLoading] = useState(false);
  const { wallets, setWallets } = useWalletContext();

  useEffect(() => {
    setLoading(true);
    getWallets().then((response) => {
      setWallets(response);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full min-h-screen pt-[1rem] ">
      <div className="w-[88%] md:w-[75%] mx-auto h-screen overflow-y-scroll remove-scrollbar">
        <div
          className="bg-white shadow-sm md:w-[70%] mx-auto h-[4rem] rounded-lg flex items-center justify-between 
        px-[2rem] border-[1px] border-gray-300"
        >
          <h1 className="text-[15px] md:text-xl text-gray-600">My balance</h1>
          <div className="flex items-center gap-2 text-xl font-extralight md:font-medium">
            <span className="uppercase ">ksh. </span>
            <span className="">
              {wallets &&
                wallets
                  .reduce((acc, wallet) => acc + parseFloat(wallet.balance), 0)
                  .toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-[3rem] mb-[1rem]">
          <h1 className="text-[13px] uppercase md:normal-case text-gray-600 md:text-xl font-medium md:font-semibold ">
            My wallets
          </h1>
          <button
            onClick={() => alert("Coming soon!")}
            className="text-primaryColor py-1 px-4 hover:bg-[#FFF4E0] text-[13px] md:text-base uppercase md:normal-case font-medium"
          >
            See all
          </button>
        </div>
        <MyWalletsList wallets={wallets} />
      </div>
    </div>
  );
};

export default Wallets;
