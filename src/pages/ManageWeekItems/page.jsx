import React, { useEffect, useState } from "react";
import ItemCard from "./components/ItemCard";
import { useNavigate, useParams } from "react-router-dom";
import { Settings, SquarePlus } from "lucide-react";
import CreateItemForm from "./components/CreateItemForm";
import { getItems } from "./api/getItems";
import { getWeekDetails } from "../WeeklySpendings/api/getWeekDetails";
import { useWeekContext } from "../../context/WeekContext";

const ManageWeekItems = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { id } = useParams();
  const [weekName, setWeekName] = useState("");
  const { items, setItems } = useWeekContext();

  useEffect(() => {
    getItems(id).then((response) => {
      setItems(response);
    });

    // getting week details i.e name
    getWeekDetails(id).then((response) => {
      setWeekName(response.name);
    });
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll remove-scrollbar md:scrollble">
      <div className="w-[88%] md:w-[75%] mx-auto min-h-screen pb-[13rem] md:pb-[10rem]">
        <div className="md:bg-primaryColor text-black md:text-white py-[0.65rem] md:py-[2rem]   top-0 z-20">
          <h1 className="text-center text-lg md:text-xl uppercase md:normal-case font-light md:font-semibold ">
            Manage items
          </h1>
        </div>
        <h1 className="uppercase text-[13px] md:text-xl text-center font-medium mt-[1rem]">
          {weekName}
        </h1>
        <h1 className="text-[15px] text-gray-600 uppercase md:normal-case md:text-2xl font-semibold mt-[2rem] mb-[1rem]">
          Items
        </h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className={`flex items-center gap-2 py-1 px-3 border-[1px] border-gray-300 rounded-2xl mb-[2rem] 
          text-[12px] md:text-[16px] hover:bg-opacity-[0.8] transition-opacity duration-300 text-white
          ${showCreateForm ? "hidden" : "bg-blue-600"}
          `}
        >
          <SquarePlus size={18} className="hidden md:block" />
          <SquarePlus size={13} className="md:hidden block" /> New item
        </button>
        <div
          className={`overflow-hidden transition-height duration-1000
          ${showCreateForm ? "" : "h-0 "}
          `}
        >
          <CreateItemForm
            setShowCreateForm={setShowCreateForm}
            setItems={setItems}
          />
        </div>
        {items &&
          items.map((item) => {
            return <ItemCard key={item.id} item={item} setItems={setItems} />;
          })}

        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 text-white py-2 px-7 rounded-3xl hover:opacity-[0.8] transition-opacity
        duration-300  mt-[4rem] mb-[2rem] uppercase md:normal-case text-[13px] md:text-[16px] font-semibold hidden md:block"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ManageWeekItems;
