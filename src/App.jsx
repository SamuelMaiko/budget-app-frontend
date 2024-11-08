import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import WalletContext from "./context/WalletContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import WeekContext from "./context/WeekContext";
import AppContext from "./context/AppContext";

const App = () => {
  return (
    <WalletContext>
      <AppContext>
        <WeekContext>
          <BrowserRouter>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover={true}
            />
            <AppRoutes />
          </BrowserRouter>
        </WeekContext>
      </AppContext>
    </WalletContext>
    // LATER
    // "see all" pages (2)
    // editing the balance or removing extra funds from the wallet
  );
};
export default App;
