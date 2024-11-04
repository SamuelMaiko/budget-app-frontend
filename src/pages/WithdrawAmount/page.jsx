import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWeekDetails } from "../WeeklySpendings/api/getWeekDetails";
import { toast } from "react-toastify";
import instance from "../../axios/instance";
import { getCookie } from "../../Cookies/Cookie";

const WithdrawAmount = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [WalletDetails, setWalletDetails] = useState({});
  const [description, setDescription] = useState("");
  const [amount, setAmount] = React.useState();
  const [invalid, setInvalid] = useState(false);
  const { item_id } = useParams();

  // useEffect(() => {
  //   getWeekDetails(id).then((response) => setWalletDetails(response));
  // }, []);

  useEffect(() => {
    // alert(typeof amount);
    if (
      amount === undefined ||
      amount === "" ||
      amount == 0 ||
      amount > parseInt(getCookie("itemRemainingAmount"), 10)
    ) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }

    // alert(typeof parseInt(getCookie("itemRemainingAmount"), 10));
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
      const response = await instance.post(
        `/weeks/week-item/${item_id}/withdraw/`,
        {
          amount: parseInt(amount, 10),
          description: description,
        }
      );
      console.log(response.data);
      toast.success("Funds withdrawn successfully");

      navigate(-1);
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
      <div className="w-[75%] mx-auto h-full">
        <div className="bg-primaryColor text-white py-[2rem]">
          <h1 className="text-center text-xl font-semibold ">Withdraw funds</h1>
        </div>
        <h1 className="uppercase text-3xl text-center font-medium mt-[1rem]">
          {getCookie("itemToWithdrawFrom")}
        </h1>
        <form onSubmit={handleSubmit} className="">
          <div className="flex items-baseline justify-center  w-[50%] mx-auto mt-[3rem] text-3xl ">
            <label htmlFor="amount " className="  text-gray-400">
              KES
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              placeholder="0"
              onChange={(e) => setAmount(e.target.value)}
              className=" bg-transparent border-b-[2px] border-b-black outline-none pt-4 pb-0 w-[7rem] ml-4 "
            />
          </div>
          <p
            className={`text-center uppercase mt-1 ${
              invalid ? "text-red-500 font-semibold" : "text-gray-500"
            }  text-sm`}
          >
            Balance: KES {getCookie("itemRemainingAmount")}{" "}
          </p>
          <div className="mt-[8rem] w-[50%] mx-auto flex justify-start">
            <div className=" w-[30rem]">
              <label className="text-base text-black dark:text-darkMode-gray">
                Brief description
              </label>
              <input
                placeholder="optional description"
                type="text"
                className="flex mt-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3
         py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1
          focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                name="name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center mt-[2rem]">
            <button
              className={` text-white py-2 px-4 rounded-3xl hover:opacity-[0.8] transition-opacity
            duration-300 w-[50%] text-lg ${
              invalid ? "bg-gray-400" : "bg-black"
            }`}
              disabled={invalid || loading}
            >
              Withdraw
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawAmount;
