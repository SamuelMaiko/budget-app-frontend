import { BadgeCheck, Plus } from "lucide-react";
import React, { useState } from "react";
import instance from "../../../axios/instance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useWeekContext } from "../../../context/WeekContext";
import { createNewCookie } from "../../../Cookies/Cookie";

const AddButton = ({ item }) => {
  const { setShowAddItemModal, setItemToAdd } = useWeekContext();
  const { id } = useParams();

  return (
    <button
      // onClick={AddItem}
      onClick={() => {
        setItemToAdd(item);
        createNewCookie("itemWeek", JSON.stringify(id));
        // console.log(item);
        setShowAddItemModal(true);
      }}
      className={`flex items-center gap-1 md:gap-2 text-green-600 hover:opacity-[0.7]
            ${!item.in_week ? "cursor-pointer" : "cursor-default "} 
            `}
      disabled={item.in_week}
    >
      {item.in_week ? (
        <>
          <BadgeCheck size={13} className="block md:hidden" />{" "}
          <BadgeCheck size={16} className="md:block hidden" />
        </>
      ) : (
        <>
          <Plus size={13} className="block md:hidden" />{" "}
          <Plus size={16} className="md:block hidden" />
        </>
      )}

      <p className="text-[12px] md:text-sm">{item.in_week ? "Added" : "Add"}</p>
    </button>
  );
};

export default AddButton;
