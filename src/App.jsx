import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import WalletContext from "./context/WalletContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import WeekContext from "./context/WeekContext";

const App = () => {
  return (
    <WalletContext>
      <WeekContext>
        <BrowserRouter>
          <ToastContainer position="bottom-right" />
          <AppRoutes />
        </BrowserRouter>
      </WeekContext>
    </WalletContext>
    // LATER
    // "see all" pages (2)
    // editing the balance or removing extra funds from the wallet
  );
};
export default App;
