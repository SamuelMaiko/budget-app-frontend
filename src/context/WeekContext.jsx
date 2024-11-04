import React, { createContext, useContext, useEffect, useState } from "react";

const createdWeekContext = createContext();
export const useWeekContext = () => useContext(createdWeekContext);

const WeekContext = ({ children }) => {
  const [weeks, setWeeks] = useState([]);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  const [itemToAdd, setItemToAdd] = useState({});
  // on the manage week items page
  const [items, setItems] = useState([]);
  const [expenseItems, setExpenseItems] = useState([]);
  const [weekDetails, setWeekDetails] = useState({});

  return (
    <createdWeekContext.Provider
      value={{
        weeks,
        setWeeks,
        showEditItemModal,
        setShowEditItemModal,
        showAddItemModal,
        setShowAddItemModal,
        items,
        setItems,
        itemToEdit,
        setItemToEdit,
        itemToAdd,
        setItemToAdd,
        expenseItems,
        setExpenseItems,
        weekDetails,
        setWeekDetails,
      }}
    >
      {children}
    </createdWeekContext.Provider>
  );
};

export default WeekContext;
