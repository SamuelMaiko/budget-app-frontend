import { Divider } from "keep-react";
import React, { useEffect, useRef, useState } from "react";
import { useWeekContext } from "../../../context/WeekContext";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import instance from "../../../axios/instance";
import { getCookie } from "../../../Cookies/Cookie";

const EditItemForm = () => {
  const {
    setShowEditItemModal,
    itemToEdit,
    setItemToEdit,
    expenseItems,
    setExpenseItems,
    setWeekDetails,
  } = useWeekContext();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState();
  const amountRef = useRef(null);

  useEffect(() => {
    setAmount(itemToEdit.amount_allocated);
    amountRef.current = itemToEdit.amount_allocated;
  }, [itemToEdit]);

  const EditItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    const prevAmount = amountRef.current;

    try {
      const response = await instance.put(
        `/weeks/edit-week-item/${itemToEdit.id}/`,
        {
          amount_allocated: parseInt(amount, 10),
        }
      );

      // console.log(response.data);
      // console.log("previous", prevAmount);
      // console.log("new", amount);

      toast.success("Item updated successfully");

      // updating the new amount in state
      setExpenseItems((currentItems) => {
        return currentItems.map((currentItem) => {
          if (currentItem.id === itemToEdit.id) {
            return { ...currentItem, amount_allocated: parseInt(amount, 10) };
          } else if (currentItem.name == "Other") {
            return {
              ...currentItem,
              amount_allocated:
                parseInt(currentItem.amount_allocated, 10) +
                (parseInt(prevAmount, 10) - parseInt(amount, 10)),
            };
          }

          return currentItem;
        });
      });

      // updating the current week details in state

      setWeekDetails((currentDetails) => {
        const result = (
          parseInt(currentDetails.total_expenses, 10) +
          (parseInt(amount, 10) - itemToEdit.amount_allocated)
        ).toFixed(2);

        return {
          ...currentDetails,
          total_expenses: result,
        };
      });

      setShowEditItemModal(false);
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
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={EditItem}
      className="absolute w-[91%] md:w-[28rem] px-2 left-[50%] translate-x-[-50%] top-[30%] rounded-lg
     bg-white pb-[1rem]"
    >
      <div className="text-[1.3rem]  px-4 flex items-center justify-between py-3 ">
        <p className="text-[15px] md:text-xl font-semibold">
          Edit {itemToEdit.name}
        </p>
        {/* close button */}
        <button
          type="button"
          onClick={() => setShowEditItemModal(false)}
          className="rounded-full hover:bg-neutral-200 dark:hover:bg-gray-600 p-2"
        >
          <>
            <X size={18} className="block md:hidden" />{" "}
            <X size={24} className="md:block hidden" />
          </>
        </button>
      </div>
      <Divider className="dark:hidden" color="primary" />
      <Divider className="hidden dark:block" color="secondary" />
      {/* central section*/}
      <div className="mt-1 mb-5 px-4">
        <label className="text-[13px] md:text-base text-black dark:text-darkMode-gray">
          Amount*
        </label>
        <input
          placeholder="amount allocated"
          type="number"
          className="flex mt-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3
         py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 text-[13px] md:text-base
          focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          name="name"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <Divider />
      <div className="flex justify-between py-3 px-4">
        <div className="flex items-center gap-2 w-full">
          <button
            onClick={() => {}}
            className={` bg-green-600 hover:opacity-[0.7]
              py-2 md:py-1 px-3 rounded-3xl md:rounded-2xl text-white transition-opacity duration-300  w-full
              uppercase md:normal-case text-[13px] md:text-[16px] font-semibold
              `}
            disabled={loading}
            type="submit"
          >
            {loading ? "Saving ..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditItemForm;
