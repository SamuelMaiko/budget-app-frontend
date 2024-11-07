import { Textarea } from "keep-react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "phosphor-react";
import {
  Button,
  DatePicker,
  Popover,
  PopoverContent,
  PopoverAction,
} from "keep-react";
// import { TimeInput } from "@nextui-org/react";
// import { Time, parseAbsoluteToLocal } from "@internationalized/date";
import { toast } from "react-toastify";
import instance from "../../../axios/instance";
import { createDate } from "../../../formatters/createDate";
import { addDaysToDate } from "../../../utils/addDaysToDate";
import { useNavigate } from "react-router-dom";
import { useWeekContext } from "../../../context/WeekContext";

const CreateWeekForm = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(() => new Date());
  const navigate = useNavigate();
  const { weeks, setWeeks } = useWeekContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // console.log(createDate(date));
    try {
      const response = await instance.post("/weeks/create/", {
        start_date: createDate(date),
        end_date: addDaysToDate(createDate(date), 7),
      });
      console.log(response.data);
      // adding the new week to the list of weeks
      setWeeks((currentWeeks) => [response.data, ...currentWeeks]);
      toast.success("week created successfully");
      navigate(`/weeks/${response.data.id}`);

      // navigate(-1);
    } catch (error) {
      if (error.response && error.response.status) {
        const status = error.response.status;
        const message = error.response.data.error;

        switch (status) {
          case 400:
            console.log(error.response);
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
    <form
      onSubmit={handleSubmit}
      className="pt-5 w-[58%] pb-14 bg-white p-5 rounded-lg shadow-md"
    >
      <div className="mb-8">
        <label className="text-base text-black dark:text-darkMode-gray">
          Start on*
        </label>
        <div className="mt-1 flex flex-row gap-10 ">
          <div>
            <Popover showArrow={false} placement="bottom-start">
              <PopoverAction asChild>
                <Button
                  className="py-4 justify-start gap-2 rounded-xl border border-metal-50 px-4
                   text-left text-body-4 font-normal text-metal-600 hover:bg-white active:focus:scale-100
                    dark:border-metal-900 dark:bg-metal-900 dark:text-white dark:hover:bg-metal-800 bg-gray-100 h-[3.5rem]"
                  variant="outline"
                  color="secondary"
                  type="button"
                >
                  <Calendar
                    size={20}
                    className="text-metal-400 dark:text-white"
                  />
                  {date ? (
                    format(date ?? new Date(), "PPP")
                  ) : (
                    <span>Select Your Date</span>
                  )}
                </Button>
              </PopoverAction>
              <PopoverContent className="z-50 max-w-min">
                <DatePicker
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  showOutsideDays={true}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <p className="text-red-600">
        Week will end after 7 days ({addDaysToDate(createDate(date), 7)})
      </p>

      <div className="flex justify-center mt-[3rem]">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-3xl hover:opacity-[0.8] transition-opacity
            duration-300 w-full text-lg"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateWeekForm;
