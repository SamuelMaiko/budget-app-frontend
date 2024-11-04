import { Divider } from "keep-react";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useWeekContext } from "../../../context/WeekContext";
import { toast } from "react-toastify";
import instance from "../../../axios/instance";
import { useParams } from "react-router-dom";
import { getCookie } from "../../../Cookies/Cookie";

const AddItemForm = () => {
  const { setShowAddItemModal, setItems, itemToAdd } = useWeekContext();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState();

  useEffect(() => {
    // setItemToAdd(JSON.parse(getCookie("itemToAddToWeek")));
    // console.log("Adding", JSON.parse(getCookie("itemToAddToWeek")));
  }, []);

  const AddItem = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await instance.post(
        `/weeks/${JSON.parse(getCookie("itemWeek"))}/add-item/`,
        {
          item_id: itemToAdd.id,
          amount,
        }
      );

      // adding it to the added items
      setItems((currentItems) => {
        return currentItems.map((currentItem) => {
          if (currentItem.id === itemToAdd.id) {
            return { ...currentItem, in_week: true };
          } else {
            return currentItem;
          }
        });
      });

      setAmount(null);
      toast.success("Item added successfully");
      setShowAddItemModal(false);
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
      onSubmit={AddItem}
      className="absolute w-[28rem] px-2 left-[50%] translate-x-[-50%] top-[30%] rounded-lg
     bg-white "
    >
      <div className="text-[1.3rem]  px-4 flex items-center justify-between py-3 ">
        <p className="text-xl font-semibold">{itemToAdd && itemToAdd.name}</p>
        {/* close button */}
        <button
          type="button"
          onClick={() => setShowAddItemModal(false)}
          className="rounded-full hover:bg-neutral-200 dark:hover:bg-gray-600 p-2"
        >
          <X size={24} />
        </button>
      </div>
      <Divider className="dark:hidden" color="primary" />
      <Divider className="hidden dark:block" color="secondary" />
      {/* central section*/}
      <div className="mt-1 mb-5 px-4">
        <label className="text-base text-black dark:text-darkMode-gray">
          Amount*
        </label>
        <input
          placeholder="amount to allocate"
          type="number"
          className="flex mt-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3
         py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1
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
            className={` bg-green-500 hover:bg-green-600
              py-1 px-3 rounded-2xl font-medium text-white transition-background duration-300  w-full`}
            disabled={loading}
            type="submit"
          >
            {loading ? "Adding ..." : "Add item"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddItemForm;