import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import prof from "../assets/budget1.jpeg";
import { DollarSign, PieChart, Wallet } from "lucide-react";
import NavBarLink from "./NavBarLink";
import { getCookie } from "../Cookies/Cookie";
import { getWeeks } from "../pages/WeeklySpendings/api/getWeeks";
import { useWeekContext } from "../context/WeekContext";
import { getProfile } from "./getProfile";
import { useAppContext } from "../context/AppContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const [username, setUsername] = useState(() => getCookie("username"));
  const { weeks, setWeeks } = useWeekContext();
  const [profile, setProfile] = useState(null);
  const { activePage, setActivePage } = useAppContext;

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/signup") {
      getWeeks().then((response) => {
        setWeeks(response);
      });
    }

    if (pathname !== "/login" && pathname !== "/signup" && !profile) {
      getProfile().then((response) => {
        setProfile(response);
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
        className={`uppercase flex items-center gap-[2rem] text-lg md:flex
        ${pathname == "/login" || pathname == "/signup" ? "md:hidden" : ""} 
        hidden `}
      >
        <NavBarLink
          icon={<Wallet size={24} />}
          name="wallets"
          onClick={() => {
            setActivePage("wallets");
            navigate("/wallets");
          }}
          className={`${activePage === "wallets" ? "text-primaryColor" : ""}`}
        />
        <NavBarLink
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
      </ul>
      <div
        className={`flex items-center gap-4
      ${pathname == "/login" || pathname == "/signup" ? "hidden" : ""} 
      `}
      >
        <h1 className="font-medium text-sm md:text-lg uppercase ">
          <span className="font-light capitalize">Hello</span>{" "}
          {profile && profile.user}!
        </h1>
        <div className="bg-blue-400 size-[2.3rem] md:size-[3rem] rounded-full overflow-hidden">
          <img
            src={profile && profile.profile_picture}
            className="w-full h-full"
            alt="profile picture"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
