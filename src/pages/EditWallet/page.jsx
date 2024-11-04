import React from "react";
import EditWalletForm from "./Components/EditWalletForm";
import { useWalletContext } from "../../context/WalletContext";

const EditWallet = () => {
  const { currentWalletTheme } = useWalletContext();

  return (
    <div className="w-full min-h-screen">
      <div className="w-[75%]  mx-auto h-full ">
        {/* <h1 className="font-medium text-xl mb-[3rem] mt-8 ">Create wallet</h1> */}
        <div className={`bg-[${currentWalletTheme}] text-white py-[2rem]`}>
          <h1 className="text-center text-xl font-semibold ">
            Edit wallet details
          </h1>
        </div>
        <h1 className="uppercase text-xl text-center font-medium mt-[1rem]">
          Weekly wallet
        </h1>
        <div className="flex flex-col items-center mt-8">
          <EditWalletForm />
        </div>
      </div>
      ;
    </div>
  );
};

export default EditWallet;
