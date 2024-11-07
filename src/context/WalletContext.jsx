import React, { createContext, useContext, useEffect, useState } from "react";

const createdWalletContext = createContext();
export const useWalletContext = () => useContext(createdWalletContext);

const WalletContext = ({ children }) => {
  const [showDeleteWalletModal, setShowDeleteWalletModal] = useState(false);
  const [currentWalletTheme, setCurrentWalletTheme] = useState("#F39C12");
  const [wallets, setWallets] = useState([]);
  const [walletToDelete, setWalletToDelete] = useState({});
  // set in the useEffect of the edit wallet form, also used in the edit page
  const [name, setName] = useState("");

  return (
    <createdWalletContext.Provider
      value={{
        showDeleteWalletModal,
        setShowDeleteWalletModal,
        currentWalletTheme,
        setCurrentWalletTheme,
        wallets,
        setWallets,
        walletToDelete,
        setWalletToDelete,
        name,
        setName,
      }}
    >
      {children}
    </createdWalletContext.Provider>
  );
};

export default WalletContext;
