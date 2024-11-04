import { Divider } from "keep-react";
import React, { useEffect, useState } from "react";
import { X } from "phosphor-react";
import { useWalletContext } from "../../../context/WalletContext";
import { toast } from "react-toastify";
import instance from "../../../axios/instance";
import { useNavigate } from "react-router-dom";

const ConfirmWalletDelete = () => {
  const [loading, setLoading] = useState(false);
  const { setShowDeleteWalletModal, walletToDelete, setWalletToDelete } =
    useWalletContext();
  const { wallets, setWallets } = useWalletContext();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await instance.delete(
        `/wallets/${walletToDelete && walletToDelete.id}/delete/`
      );

      toast.success("Deleted successfully");

      // removing the deleted wallet from STATE
      setWallets((currentWallets) => {
        return currentWallets.filter(
          (wallet) => wallet.id !== walletToDelete.id
        );
      });

      setWalletToDelete(null);
      setShowDeleteWalletModal(false);
      // navigate(-1);
    } catch (error) {
      if (error.response && error.response.status) {
        const status = error.response.status;
        const message = error.response.data.error;

        switch (status) {
          case 400:
            toast.error(`${message}`);
            break;
          case 401:
            toast.error(`${message}`);
            break;
          case 404:
            toast.error(message);
            break;
          case 500:
            toast.error(`Server Error: Internal Server Error.`);
            break;
          default:
            toast.error("Unknown error occurred");
            break;
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="absolute w-[23rem]  px-2 left-[50%] translate-x-[-50%] top-[30%] rounded-lg
     bg-white "
    >
      <div className="text-[1.3rem]  px-4 flex items-center justify-between py-3 ">
        <p className="text-xl font-semibold">
          Delete wallet ({walletToDelete && walletToDelete.name})
        </p>
        {/* close button */}
        <button
          onClick={() => setShowDeleteWalletModal(false)}
          className="rounded-full hover:bg-neutral-200 dark:hover:bg-gray-600 p-2"
        >
          <X size={24} />
        </button>
      </div>
      <Divider className="dark:hidden" color="primary" />
      <Divider className="hidden dark:block" color="secondary" />
      {/* central section*/}
      <div className="p-3">
        <p>Are you sure? All data related to wallet will be lost.</p>
      </div>
      <Divider />
      <div className="flex justify-between py-3 px-4">
        <div></div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setWalletToDelete(null);
              setShowDeleteWalletModal(false);
            }}
            className="border-[1px] border-red-500 py-1 px-3 rounded-2xl hover:bg-gray-100
             font-medium text-red-500 transition-background duration-300 flex items-center"
          >
            <span>Cancel</span>
          </button>
          <button
            onClick={handleDelete}
            className={` bg-red-500 hover:bg-red-600
              py-1 px-3 rounded-2xl font-medium text-white transition-background duration-300 flex items-center`}
            disabled={loading}
          >
            <span>{loading ? "deleting ..." : "Delete"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWalletDelete;
