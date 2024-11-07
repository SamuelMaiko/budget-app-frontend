import { PieChart, Wallet } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MobileNavLink from "./MobileNavLink";
import { useWeekContext } from "../context/WeekContext";
import { useAppContext } from "../context/AppContext";

const MobileNavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { weeks, setWeeks } = useWeekContext();
  const { activePage, setActivePage } = useAppContext();

  return (
    <div
      className={`min-h-[4rem] w-full bg-white text-neutral-400 fixed -bottom-0 md:hidden flex items-start
     justify-between px-10 py-2 ${
       pathname == "/login" || pathname == "/signup" ? "hidden" : ""
     }`}
    >
      <MobileNavLink
        icon={<Wallet size={24} />}
        name="wallets"
        onClick={() => {
          setActivePage("wallets");
          navigate("/wallets");
        }}
        className={`${activePage === "wallets" ? "text-primaryColor" : ""}`}
      />
      <MobileNavLink
        icon={<PieChart size={24} />}
        name="weekly spendings"
        onClick={() => {
          setActivePage("weekly-spendings");
          navigate(`/weeks/${weeks[0].id}`);
        }}
        className={`${
          activePage === "weekly-spendings" ? "text-primaryColor" : ""
        }`}
      />
    </div>
  );
};

export default MobileNavBar;
