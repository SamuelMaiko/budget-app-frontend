import React from "react";
import { useWeekContext } from "../../../context/WeekContext";
import AddItemForm from "../components/AddItemForm";

const AddItemModal = () => {
  const { showAddItemModal } = useWeekContext();

  return (
    <div
      className={`${
        showAddItemModal ? "" : "hidden"
      } bg-[rgba(0,0,0,0.3)] dark:bg-[rgba(0,0,0,0.6)] fixed z-50 inset-0`}
    >
      <AddItemForm />
    </div>
  );
};

export default AddItemModal;
