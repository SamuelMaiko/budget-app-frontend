import React from "react";
import { useWeekContext } from "../../../context/WeekContext";
import EditItemForm from "../components/EditItemForm";

const EditItemModal = () => {
  const { showEditItemModal, setShowEditItemModal } = useWeekContext();

  return (
    <div
      onClick={() => setShowEditItemModal(false)}
      className={`${
        showEditItemModal ? "" : "hidden"
      } bg-[rgba(0,0,0,0.3)] dark:bg-[rgba(0,0,0,0.6)] fixed z-50 inset-0`}
    >
      <EditItemForm />
    </div>
  );
};

export default EditItemModal;
