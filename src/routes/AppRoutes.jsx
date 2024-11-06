import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing/page";
import NavBar from "../GeneralComponents/NavBar";
import Wallets from "../pages/Wallets/page";
import WalletDetails from "../pages/WalletDetails/page";
import TransferToWallet from "../pages/TransferToWallet/page";
import EnterTransferAmount from "../pages/EnterTransferAmount/page";
import DepositAmount from "../pages/DepositAmount/page";
import DeleteWalletModal from "../pages/Wallets/components/DeleteWalletModal";
import CreateWallet from "../pages/CreateWallet/page";
import EditWallet from "../pages/EditWallet/page";
import WeeklySpendings from "../pages/WeeklySpendings/page";
import CreateWeek from "../pages/CreateWeek/page";
import WithdrawAmount from "../pages/WithdrawAmount/page";
import Login from "../pages/Login/page";
import SignUp from "../pages/SignUp/page";
import ManageWeekItems from "../pages/ManageWeekItems/page";
import EditItemModal from "../pages/WeeklySpendings/modals/EditItemModal";
import AddItemModal from "../pages/ManageWeekItems/modals/AddItemModal";

const AppRoutes = () => {
  return (
    <div className="font-opensans transition-colors duration-300 bg-[#eeeeee] h-screen overflow-hidden">
      <NavBar />
      <div>
        <Routes>
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/wallets" element={<Wallets />} />
          <Route path="/wallets/:id" element={<WalletDetails />} />
          <Route
            path="/wallets/:id/transfer-funds"
            element={<TransferToWallet />}
          />
          <Route
            path="/wallets/:id/transfer-funds/amount"
            element={<EnterTransferAmount />}
          />
          <Route path="/wallets/:id/deposit" element={<DepositAmount />} />
          <Route path="/wallets/create" element={<CreateWallet />} />
          <Route path="/wallets/:id/edit" element={<EditWallet />} />
          <Route path="/weeks/:id" element={<WeeklySpendings />} />
          <Route path="/weeks/create" element={<CreateWeek />} />
          <Route
            path="/week/:week_id/item/:item_id/withdraw"
            element={<WithdrawAmount />}
          />
          <Route path="/weeks/:id/manage-items" element={<ManageWeekItems />} />
        </Routes>
        <div className="">
          <Outlet />
        </div>
      </div>

      <DeleteWalletModal />
      <EditItemModal />
      <AddItemModal />
    </div>
  );
};

export default AppRoutes;
