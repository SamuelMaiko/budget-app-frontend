import React from "react";
import EditWalletForm from "./Components/EditWalletForm";
import { useWalletContext } from "../../context/WalletContext";

const EditWallet = () => {
  const { currentWalletTheme } = useWalletContext();

  return (
    <div className="w-full min-h-screen">
      <div className="w-[88%] md:w-[75%]  mx-auto h-screen overflow-y-scroll md:overflow-hidden remove-scrollbar ">
        {/* <h1 className="font-medium text-xl mb-[3rem] mt-8 ">Create wallet</h1> */}
        <div
          className={`bg-[${currentWalletTheme}] text-white py-[1.7rem] md:py-[2rem]`}
        >
          <h1 className="text-center text-xl font-semibold ">
            Edit wallet details
          </h1>
        </div>
        <h1 className="uppercase text-xl text-center font-medium mt-[1rem]">
          Weekly wallet
        </h1>
        <div className="flex flex-col items-center mt-8 mb-[11rem]">
          <EditWalletForm />
        </div>
      </div>
      ;
    </div>
  );
};

export default EditWallet;
