import React from "react";
import ConfirmWalletDelete from "./ConfirmWalletDelete";
import { useWalletContext } from "../../../context/WalletContext";

const DeleteWalletModal = () => {
  const { showDeleteWalletModal } = useWalletContext();

  return (
    <div
      className={`${
        showDeleteWalletModal ? "" : "hidden"
      } bg-[rgba(0,0,0,0.3)] dark:bg-[rgba(0,0,0,0.6)] fixed z-50 inset-0`}
    >
      <ConfirmWalletDelete />
    </div>
  );
};

export default DeleteWalletModal;
