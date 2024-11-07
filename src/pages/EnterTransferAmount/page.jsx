import React, { useEffect, useState } from "react";
import { getWalletDetails } from "../EditWallet/api/walletdetails";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../axios/instance";
import { getCookie } from "../../Cookies/Cookie";

const EnterTransferAmount = () => {
  const { id } = useParams();
  const [balance, setBalance] = React.useState(1000);
  const [name, setName] = useState("");
  const [otherWalletName, setOtherWalletName] = useState("");
  const [amount, setAmount] = React.useState();
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // getting the wallet details
    getWalletDetails(id)
      .then((response) => {
        setBalance(response.balance);
        setName(response.name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // getting other wallet name
    // getting the wallet name
    getWalletDetails(parseInt(getCookie("walletToTransferFundsTo"), 10))
      .then((response) => {
        setOtherWalletName(response.name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    let value = 0;
    // alert(typeof amount);
    if (amount !== "") {
      value = amount;
    }

    if (parseInt(value, 10) > parseInt(balance, 10) || value === 0) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [amount]);

  // function to transfer the money
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (amount < 0) {
      toast.error("Invalid amount");
      setLoading(false);
      return;
    }

    try {
      const response = await instance.post("/wallets/transfer-funds/", {
        from_wallet_id: id,
        to_wallet_id: parseInt(getCookie("walletToTransferFundsTo"), 10),
        amount: parseInt(amount, 10),
      });
      console.log(response.data);
      toast.success("Funds transferred successfully");
      setBalance((current) => current - amount);
      setAmount(0);

      navigate(`/wallets/${id}`);
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
            toast.error("Invalid username or password");
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
    <div className="w-full min-h-screen">
      <div className="w-[88%] md:w-[75%] mx-auto h-full">
        <div className="bg-primaryColor text-white py-[2rem]">
          <h1 className="text-center text-xl font-semibold ">
            Transfer amount
          </h1>
        </div>
        <h1 className="uppercase text-xl text-center font-medium mt-[1rem]">
          {name} to {otherWalletName}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-baseline mx-auto w-fit mt-[3rem] text-3xl">
            <label htmlFor="amount " className="  text-gray-400">
              KES
            </label>
            <input
              placeholder="0"
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className=" bg-transparent border-b-[2px] border-b-black outline-none pt-4 pb-0 w-[7rem] ml-4 text-gray-600"
            />
          </div>
          <p
            className={`text-center uppercase mt-1 ${
              invalid ? "text-red-500 font-semibold" : "text-gray-500"
            }  text-sm`}
          >
            Balance: KES {balance}{" "}
          </p>
          <div className="flex justify-center mt-[5rem]">
            <button
              className={` text-white py-3 md:py-2 px-4 rounded-[2rem] md:rounded-3xl  transition-opacity
            duration-300 w-full md:w-[50%] text-xl md:text-lg ${
              invalid
                ? "cursor-not-allowed bg-gray-400"
                : " bg-black hover:opacity-[0.8]"
            }`}
              disabled={invalid || loading}
            >
              {loading ? "Transferring..." : "Transfer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterTransferAmount;
