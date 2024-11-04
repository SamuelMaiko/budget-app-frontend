import { form } from "framer-motion/client";
import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import instance from "../../../axios/instance";

const CreateItemForm = ({ setShowCreateForm, setItems }) => {
  const [itemName, setItemName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await instance.post("/expense-items/create/", {
        name: itemName,
      });

      setItems((currentItems) => {
        return [...currentItems, response.data];
      });

      toast.success("Item created successfully");
      setShowCreateForm(false);
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
    <form className="pl-3" onSubmit={handleSubmit}>
      <div className="mt-1 mb-5">
        <label className="text-base text-black dark:text-darkMode-gray">
          Name*
        </label>
        <input
          placeholder="name of item"
          type="text"
          className="flex mt-2 h-10 w-[50%] rounded-md border border-gray-300 bg-transparent px-3
         py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1
          focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          name="name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 justify-start mt-[2rem] mb-[3rem]">
        <button
          className="bg-primaryColor text-white py-[6px] px-3 rounded-3xl hover:opacity-[0.8] transition-opacity
        duration-300 text-[16px] w-fit"
        >
          Create
        </button>
        <button
          onClick={() => setShowCreateForm(false)}
          className="bg-white text-black py-[6px] px-3 rounded-3xl hover:opacity-[0.8] transition-opacity
        duration-300 text-[16px] w-fit flex items-center gap-1 text-sm border-[1px] border-gray-300"
        >
          <X size={17} />
          Close
          {/* <span></span> */}
        </button>
      </div>
    </form>
  );
};

export default CreateItemForm;
