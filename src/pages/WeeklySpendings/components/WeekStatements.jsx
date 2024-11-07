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
    <div className="mb-[20rem] ">
      <div className="flex justify-between items-center mt-[3rem] mb-[1rem]">
        <h1 className="text-[13px] uppercase md:normal-case text-gray-600 md:text-xl font-medium md:font-semibold ">
          Statements
        </h1>
        <button
          onClick={() => alert("Coming soon!")}
          className="text-primaryColor py-1 px-4 hover:bg-[#FFF4E0] text-[13px] md:text-base uppercase md:normal-case font-medium"
        >
          See all
        </button>
      </div>
      {/* statements div */}
      <div
        className={`bg-white mb-[10rem] shadow-lg rounded-lg overflow-hidden
        ${statements.length == 0 ? "hidden" : ""}
        `}
      >
        {statements &&
          statements.map((statement) => {
            return <StatementCard key={statement.id} statement={statement} />;
          })}
      </div>
      {/* no statements found div */}
      <div
        className={`pb-5 mb-[5rem] md:mb-0 ${
          statements.length == 0 ? "" : "hidden"
        }`}
      >
        <p className="text-[14px] text-gray-600 md:text-xl ">
          No statements are available for this week!
        </p>
      </div>
    </div>
  );
};

export default WeekStatements;
