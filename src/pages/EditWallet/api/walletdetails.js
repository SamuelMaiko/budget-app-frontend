import { toast } from "react-toastify";
import instance from "../../../axios/instance";

export const getWalletDetails = async (id) => {
  try {
    const response = await instance.get(`/wallets/${id}/`);
    return response.data;
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
  }
};
