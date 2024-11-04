import { BadgeCheck, Minus, Plus } from "lucide-react";
import React from "react";
import AddButton from "./AddButton";
import RemoveButton from "./RemoveButton";

const ItemCard = ({ item, setItems }) => {
  return (
    <div
      className={`flex justify-between py-5 px-2 border-b-[1px] border-gray-300
    ${item.name.toLowerCase() == "other" ? "hidden" : ""}
    `}
    >
      <p>{item.name}</p>
      <div className="flex gap-[2.3rem]">
        {/* the add button */}
        <AddButton item={item} />
        {/* the remove button */}
        <RemoveButton item={item} setItems={setItems} />
      </div>
    </div>
  );
};

export default ItemCard;
