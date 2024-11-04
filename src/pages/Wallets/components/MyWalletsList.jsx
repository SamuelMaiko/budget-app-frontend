import React from "react";
import WalletCard from "./WalletCard";
import AddWalletCard from "./AddWalletCard";

const MyWalletsList = ({ wallets }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {wallets &&
        wallets.map((wallet) => {
          return <WalletCard key={wallet.id} wallet={wallet} />;
        })}
      {/* <WalletCard />
      <WalletCard />
      <WalletCard /> */}
      <AddWalletCard />
    </div>
  );
};

export default MyWalletsList;
