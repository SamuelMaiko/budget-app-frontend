import { Minus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import instance from "../../../axios/instance";
import { useNavigate, useParams } from "react-router-dom";

const RemoveButton = ({ item, setItems }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const RemoveItem = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await instance.delete(`/weeks/${id}/remove-item/`, {
        data: {
          item_id: item.id,
        },
      });

      // removing it from the added items
      setItems((currentItems) => {
        return currentItems.map((currentItem) => {
          if (currentItem.id === item.id) {
            return { ...currentItem, in_week: false };
          } else {
            return currentItem;
          }
        });
      });
      toast.success("Item removed successfully");
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
    <button
      onClick={RemoveItem}
      className={`flex items-center gap-2 text-red-600 hover:opacity-[0.7]
          ${item.in_week ? "cursor-pointer" : "cursor-default "}
          `}
      disabled={!item.in_week}
    >
      <Minus size={16} />
      <p className="text-sm">Remove</p>
    </button>
  );
};

export default RemoveButton;
