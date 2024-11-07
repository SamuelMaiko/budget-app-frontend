import React, { useEffect, useState } from "react";
import TransactionCard from "../../Wallets/components/TransactionCard";
import instance from "../../../axios/instance";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const WalletTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { id } = useParams();

  const getWalletsTransactions = async () => {
    try {
      const response = await instance.get(`/wallets/${id}/transactions/`);

      setTransactions(response.data);
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
    }
  };

  useEffect(() => {
    getWalletsTransactions();
  }, []);

  return (
    <>
      {/* transactions div */}
      <div className="bg-white shadow-lg mb-[10rem] md:mb-[10rem] rounded-lg overflow-hidden ">
        {transactions &&
          transactions.map((transaction) => {
            return (
              <TransactionCard key={transaction.id} transaction={transaction} />
            );
          })}
      </div>
      {/* no transactions found div */}
      <div className="pb-5">
        <p className="">No transactions are available for this week!</p>
      </div>
    </>
  );
};

export default WalletTransactions;
