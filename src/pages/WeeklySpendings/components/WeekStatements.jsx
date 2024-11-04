import React, { useEffect, useState } from "react";
// import StatementCard from "../../Wallets/components/StatementCard";
import { useParams } from "react-router-dom";
import instance from "../../../axios/instance";
import { toast } from "react-toastify";
import StatementCard from "./StatementCard";

const WeekStatements = () => {
  const [statements, setStatements] = useState([]);
  const { id } = useParams();

  const getWeekStatements = async () => {
    try {
      const response = await instance.get(`/weeks/${id}/statements/`);

      setStatements(response.data);
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
    }
  };

  useEffect(() => {
    getWeekStatements();
  }, [id]);

  return (
    <div className="pb-[5rem] ">
      <div className="flex justify-between items-center mt-[3rem] mb-[1rem]">
        <h1 className="text-xl font-Montserrat font-semibold ">Statements</h1>
        <button
          onClick={() => alert("Coming soon!")}
          className="text-primaryColor py-1 px-4 hover:bg-[#FFF4E0]"
        >
          See all
        </button>
      </div>
      <div className="bg-white shadow-lg min-h-[50vh] rounded-lg overflow-hidden">
        {statements &&
          statements.map((statement) => {
            return <StatementCard key={statement.id} statement={statement} />;
          })}
      </div>
    </div>
  );
};

export default WeekStatements;
