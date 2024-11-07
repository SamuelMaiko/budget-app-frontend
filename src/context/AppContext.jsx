import React, { createContext, useContext } from "react";
import useLocalStorage from "../customHooks/useLocalStorage";

const createdAppContext = createContext();
export const useAppContext = () => useContext(createdAppContext);

const AppContext = ({ children }) => {
  const [activePage, setActivePage] = useLocalStorage("activePage", "wallets");

  return (
    <createdAppContext.Provider
      value={{
        activePage,
        setActivePage,
      }}
    >
      {children}
    </createdAppContext.Provider>
  );
};

export default AppContext;
