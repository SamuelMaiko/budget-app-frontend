import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWalletDetails } from "../EditWallet/api/walletdetails";
import { toast } from "react-toastify";
import instance from "../../axios/instance";

const DepositAmount = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [WalletDetails, setWalletDetails] = useState({});
  const [amount, setAmount] = React.useState();
  const [invalid, setInvalid] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getWalletDetails(id).then((response) => setWalletDetails(response));
  }, []);

  useEffect(() => {
    // alert(typeof amount);
    if (amount === undefined || amount === "" || amount == 0) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [amount]);

  // function to deposit the money
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (amount < 0) {
      toast.error("Invalid amount");
      setLoading(false);
      return;
    }

    try {
      const response = await instance.post(`/wallets/${id}/deposit-funds/`, {
        amount: parseInt(amount, 10),
      });
      console.log(response.data);
      toast.success("Funds transferred successfully");

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
          <h1 className="text-center text-xl font-semibold ">Deposit funds</h1>
        </div>
        <h1 className="uppercase text-xl text-center font-medium mt-[1rem]">
          {WalletDetails.name}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-baseline mx-auto w-fit mt-[3rem] text-3xl ">
            <label htmlFor="amount " className="  text-gray-400">
              KES
            </label>
            <input
              type="number"
              placeholder="0"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className=" bg-transparent border-b-[2px] border-b-black outline-none pt-4 pb-0 w-[7rem] ml-4 "
            />
          </div>
          <div className="flex justify-center mt-[5rem]">
            <button
              className={` text-white py-3 md:py-2 px-4 rounded-[2rem] md:rounded-3xl hover:opacity-[0.8] transition-opacity
            duration-300 w-full md:w-[50%] text-xl md:text-lg ${
              invalid ? "bg-gray-400" : "bg-black"
            }`}
              disabled={invalid || loading}
            >
              {loading ? "Depositing ..." : "Deposit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositAmount;
