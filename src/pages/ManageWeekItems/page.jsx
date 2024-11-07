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
      <div className="w-[88%] md:w-[75%] mx-auto min-h-screen pb-[10rem] ">
        <div className="bg-primaryColor text-white py-[1.7rem] md:py-[2rem]">
          <h1 className="text-center text-xl font-semibold ">Manage items</h1>
        </div>
        <h1 className="uppercase text-lg md:text-xl text-center font-medium mt-[1rem]">
          {weekName}
        </h1>
        <h1 className="text-2xl font-Montserrat font-semibold mt-[2rem] mb-[1rem]">
          Items
        </h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className={`flex items-center gap-2 py-1 px-3 border-[1px] border-gray-300 rounded-2xl mb-[2rem] 
          text-[16px] hover:bg-opacity-[0.8] transition-opacity duration-300 text-white
          ${showCreateForm ? "hidden" : "bg-blue-600"}
          `}
        >
          <SquarePlus size={18} /> New item
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
        duration-300 text-[16px] mt-[4rem] mb-[2rem] "
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ManageWeekItems;
