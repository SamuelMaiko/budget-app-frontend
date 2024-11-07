import React, { useEffect, useState } from "react";
import { getWalletDetails } from "../api/walletdetails";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../../axios/instance";
import { toast } from "react-toastify";
import { useWalletContext } from "../../../context/WalletContext";

const EditWalletForm = () => {
  // const [walletDetails, setWalletDetails] = useState({});

  const [selectedTheme, setSelectedTheme] = useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setCurrentWalletTheme, name, setName } = useWalletContext();

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
    setCurrentWalletTheme(e.target.value);
  };

  useEffect(() => {
    getWalletDetails(id)
      .then((response) => {
        // setWalletDetails(response);
        setName(response.name);
        setSelectedTheme(response.color_theme);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await instance.put(`/wallets/${id}/edit/`, {
        username: name,
        color_theme: selectedTheme,
      });
      setSelectedTheme(response.data.color_theme);
      setName(response.data.name);

      toast.success("updated successfully");

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
            toast.error("endpoint not found");
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
      onSubmit={handleSubmit}
      className="pt-5 md:w-[68%] pb-8 md:pb-14 bg-white shadow-md rounded-lg p-5"
    >
      <div className="mt-1 mb-5">
        <label className="text-[13px] md:text-base text-black dark:text-darkMode-gray">
          Name*
        </label>
        <input
          placeholder="name of wallet"
          type="text"
          className="flex mt-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3
         py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 text-[13px] md:text-base
          focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={name === "Weekly wallet"}
        />
      </div>
      <div className="my-8 ">
        <label className="text-[13px] md:text-base text-black dark:text-darkMode-gray ">
          Theme
        </label>

        <div className="mt-4 flex items-center gap-10 flex-wrap">
          {/* first */}
          <div className="flex gap-2 text-neutral-500">
            <input
              type="radio"
              name="theme"
              id="one"
              className="cursor-pointer"
              value="#1E90FF"
              checked={selectedTheme === "#1E90FF"}
              onChange={handleThemeChange}
            />
            <label
              htmlFor="one"
              className="size-[1.9rem] md:size-[2.7rem] bg-[#1E90FF] rounded-full"
            ></label>
          </div>
          {/* second */}
          <div className="flex gap-2 text-neutral-500">
            <input
              type="radio"
              name="theme"
              id="two"
              className="cursor-pointer"
              value="#3EB489"
              checked={selectedTheme === "#3EB489"}
              onChange={handleThemeChange}
            />
            <label
              htmlFor="two"
              className="size-[1.9rem] md:size-[2.7rem] bg-[#3EB489] rounded-full"
            ></label>
          </div>
          {/* third */}
          {/* <div className="flex gap-2 text-neutral-500">
            <input
              type="radio"
              name="theme"
              id="three"
              className="cursor-pointer"
              value="#FF4500"
              checked={selectedTheme === "#FF4500"}
              onChange={handleThemeChange}
            />
            <label
              htmlFor="three"
              className="size-[1.9rem] md:size-[2.7rem] bg-[#FF4500] rounded-full"
            ></label>
          </div> */}
          {/* fourth */}
          <div className="flex gap-2 text-neutral-500">
            <input
              type="radio"
              name="theme"
              id="four"
              className="cursor-pointer"
              value="#FF4500"
              checked={selectedTheme === "#FF4500"}
              onChange={handleThemeChange}
            />
            <label
              htmlFor="four"
              className="size-[1.9rem] md:size-[2.7rem] bg-[#FF4500] rounded-full"
            ></label>
          </div>
          {/* fifth */}
          <div className="flex gap-2 text-neutral-500">
            <input
              type="radio"
              name="theme"
              id="five"
              className="cursor-pointer"
              value="#9370DB"
              checked={selectedTheme === "#9370DB"}
              onChange={handleThemeChange}
            />
            <label
              htmlFor="five"
              className="size-[1.9rem] md:size-[2.7rem] bg-[#9370DB] rounded-full"
            ></label>
          </div>
          {/* sixth */}
          <div className="flex gap-2 text-neutral-500">
            <input
              type="radio"
              name="theme"
              id="six"
              className="cursor-pointer"
              value="#FFD700"
              checked={selectedTheme === "#FFD700"}
              onChange={handleThemeChange}
            />
            <label
              htmlFor="six"
              className="size-[1.9rem] md:size-[2.7rem] bg-[#FFD700] rounded-full"
            ></label>
          </div>
          {/* seventh */}
          <div className="flex gap-2 text-neutral-500">
            <input
              type="radio"
              name="theme"
              id="seven"
              className="cursor-pointer"
              value="#36454F"
              checked={selectedTheme === "#36454F"}
              onChange={handleThemeChange}
            />
            <label
              htmlFor="seven"
              className="size-[1.9rem] md:size-[2.7rem] bg-[#36454F] rounded-full"
            ></label>
          </div>
          {/* eight */}
          <div className="flex gap-2 text-neutral-500">
            <input
              type="radio"
              name="theme"
              id="eight"
              className="cursor-pointer"
              value="#FFB6C1"
              checked={selectedTheme === "#FFB6C1"}
              onChange={handleThemeChange}
            />
            <label
              htmlFor="eight"
              className="size-[1.9rem] md:size-[2.7rem] bg-[#FFB6C1] rounded-full"
            ></label>
          </div>
          {/* nineth */}
          <div className="flex gap-2 text-neutral-500">
            <input
              type="radio"
              name="theme"
              id="nine"
              className="cursor-pointer"
              value="#228B22"
              checked={selectedTheme === "#228B22"}
              onChange={handleThemeChange}
            />
            <label
              htmlFor="nine"
              className="size-[1.9rem] md:size-[2.7rem] bg-[#228B22] rounded-full"
            ></label>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-[3rem] md:mt-[5rem]">
        <button
          className="bg-primaryColor text-white py-3 md:py-2 px-4 rounded-3xl hover:opacity-[0.8] transition-opacity
            duration-300 w-full uppercase md:normal-case text-[13px] md:text-[16px] font-semibold flex items-center justify-center"
          disabled={loading}
        >
          {loading ? "Saving ..." : " Save changes"}
        </button>
      </div>
    </form>
  );
};

export default EditWalletForm;
