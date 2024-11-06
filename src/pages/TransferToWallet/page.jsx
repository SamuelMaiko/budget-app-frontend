import React, { useEffect, useState } from "react";
import WalletMiniCard from "./components/WalletMiniCard";
import { useParams } from "react-router-dom";
import { getWalletDetails } from "../EditWallet/api/walletdetails";
import { getWallets } from "../Wallets/api/getWallets";

const TransferToWallet = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    // getting the wallet name
    getWalletDetails(id)
      .then((response) => {
        // setWalletDetails(response);
        setName(response.name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // getting the other wallets for the logged in user
    getWallets().then((response) => {
      setWallets(response);
    });
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-[88%] md:w-[75%] mx-auto min-h-screen">
        <div className="bg-primaryColor text-white py-[2rem]">
          <h1 className="text-center text-xl font-semibold ">Transfer funds</h1>
        </div>
        <h1 className="uppercase text-xl text-center font-medium mt-[1rem]">
          {name} to
        </h1>
        <div className="pt-[1.4rem] flex flex-col gap-4">
          {wallets &&
            wallets.map((wallet, index) => {
              if (wallet.id != id) {
                return <WalletMiniCard key={index} wallet={wallet} />;
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default TransferToWallet;
