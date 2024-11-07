import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import prof from "../assets/budget1.jpeg";
import { DollarSign, PieChart, Wallet } from "lucide-react";
import NavBarLink from "./NavBarLink";
import { getCookie } from "../Cookies/Cookie";
import { getWeeks } from "../pages/WeeklySpendings/api/getWeeks";
import { useWeekContext } from "../context/WeekContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [username, setUsername] = useState(() => getCookie("username"));
  const { weeks, setWeeks } = useWeekContext();

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/signup") {
      getWeeks().then((response) => {
        setWeeks(response);
      });
    }
  }, [pathname]);

  return (
    <div
      className={`h-[4.5rem] md:bg-gray-50 md:border-[1px] border-neutral-400 flex items-center 
    ${
      pathname == "/login" || pathname == "/signup"
        ? " pl-[3rem]"
        : "justify-around"
    } 
    `}
    >
      <h1 className="text-2xl md:text-3xl font-semibold">Budgetty</h1>
      {/* navbar links */}
      <ul
        className={`uppercase flex items-center gap-[2rem] text-lg
        ${pathname == "/login" || pathname == "/signup" ? "hidden" : ""} 
        hidden md:flex`}
      >
        <NavBarLink
          icon={<Wallet size={24} />}
          name="wallets"
          onClick={() => navigate("/wallets")}
          className={`${pathname === "/wallets" ? "text-primaryColor" : ""}`}
        />
        <NavBarLink
          icon={<PieChart size={24} />}
          name="weekly spendings"
          onClick={() => navigate(`/weeks/${weeks[0].id}`)}
          className={`${
            pathname === "/weekly-spendings" ? "text-primaryColor" : ""
          }`}
        />
      </ul>
      <div
        className={`flex items-center gap-4
      ${pathname == "/login" || pathname == "/signup" ? "hidden" : ""} 
      `}
      >
        <h1 className="font-medium text-lg">
          Hello {username.charAt(0).toUpperCase() + username.slice(1)}!
        </h1>
        <div className="bg-blue-400 size-[2.3rem] md:size-[3rem] rounded-xl overflow-hidden">
          <img src={prof} className="w-full h-full" alt="profile picture" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
