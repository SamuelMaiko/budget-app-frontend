import React from "react";
import CreateWalletForm from "./Components/CreateWalletForm";

const CreateWallet = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="w-[75%]  mx-auto h-full ">
        {/* <h1 className="font-medium text-xl mb-[3rem] mt-8 ">Create wallet</h1> */}
        <div className="bg-primaryColor text-white py-[2rem]">
          <h1 className="text-center text-xl font-semibold ">Create wallet</h1>
        </div>
        <div className="flex flex-col items-center mt-8">
          <CreateWalletForm />
        </div>
      </div>
      ;
    </div>
  );
};

export default CreateWallet;