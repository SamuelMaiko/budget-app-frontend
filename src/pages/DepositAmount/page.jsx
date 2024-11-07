import React, { useEffect, useRef, useState } from "react";
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
  const amountinputRef = useRef(null);

  useEffect(() => {
    getWalletDetails(id).then((response) => setWalletDetails(response));

    // focusing on the amount input on page visit
    amountinputRef.current.focus();
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
        <div className="md:bg-primaryColor text-black md:text-white py-[0.65rem] md:py-[2rem]   top-0 z-20">
          <h1 className="text-center text-lg md:text-xl uppercase md:normal-case font-light md:font-semibold ">
            Deposit funds
          </h1>
        </div>
        <h1 className="uppercase text-[16px] md:text-3xl text-center font-medium mt-[1rem]">
          {WalletDetails.name}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-baseline mx-auto w-fit mt-[3rem] text-3xl ">
            <label
              htmlFor="amount "
              className="text-gray-400 font-extralight md:font-normal"
            >
              KSH.
            </label>
            <input
              ref={amountinputRef}
              type="number"
              id="amount"
              value={amount}
              placeholder="0"
              onChange={(e) => setAmount(e.target.value)}
              className=" bg-transparent outline-none pt-4 pb-0 w-[7rem] ml-4 font-bold"
            />
          </div>
          <div className="flex justify-center mt-[4rem] md:mt-[5rem]">
            <button
              className={` text-white py-3 md:py-2 px-4 rounded-[2rem] md:rounded-3xl hover:opacity-[0.8] transition-opacity
            duration-300 w-full md:w-[50%] 
            uppercase md:normal-case text-[13px] md:text-[16px] font-semibold flex items-center justify-center
            ${invalid ? "bg-gray-400" : "bg-black"}`}
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
