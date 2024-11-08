import React from "react";
import CreateWalletForm from "./Components/CreateWalletForm";

const CreateWallet = () => {
  return (
    <div className="w-full min-h-screen ">
      <div className="w-[88%] md:w-[75%] mx-auto h-screen overflow-y-scroll md:overflow-hidden remove-scrollbar ">
        {/* <h1 className="font-medium text-xl mb-[3rem] mt-8 ">Create wallet</h1> */}
        <div className="md:bg-primaryColor text-black md:text-white py-[0.65rem] md:py-[2rem]   top-0 z-20">
          <h1 className="text-center text-lg md:text-xl uppercase md:normal-case font-light md:font-semibold ">
            Create wallet
          </h1>
        </div>
        <div className="flex flex-col items-center mt-8 mb-[11rem]">
          <CreateWalletForm />
        </div>
      </div>
      ;
    </div>
  );
};

export default CreateWallet;
