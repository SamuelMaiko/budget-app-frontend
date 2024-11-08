// import { PieChart, Wallet } from "lucide-react";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MobileNavLink from "./MobileNavLink";
import { useWeekContext } from "../context/WeekContext";
import { useAppContext } from "../context/AppContext";
import { ChartPieSlice, Wallet } from "phosphor-react";
import { getWeeks } from "../pages/WeeklySpendings/api/getWeeks";
import { getProfile } from "./getProfile";

const MobileNavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { weeks, setWeeks } = useWeekContext();
  const { activePage, setActivePage } = useAppContext();

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/signup") {
      getWeeks().then((response) => {
        setWeeks(response);
      });
    }

    // if (pathname !== "/login" && pathname !== "/signup" && !profile) {
    //   getProfile().then((response) => {
    //     setProfile(response);
    //   });
    // }
  }, [pathname]);

  return (
    <div
      className={`min-h-[4rem] w-full bg-white text-neutral-400 fixed -bottom-0 md:hidden flex items-start
     justify-between px-12 py-2 ${
       pathname == "/login" || pathname == "/signup" ? "hidden" : ""
     }`}
    >
      <MobileNavLink
        icon={
          <>
            <>
              <Wallet
                size={25}
                weight="fill"
                className={`${activePage === "wallets" ? "" : "hidden"}`}
              />
              <Wallet
                size={25}
                // weight="fill"
                className={`${activePage === "wallets" ? "hidden" : ""}`}
              />
            </>
          </>
        }
        name="wallets"
        onClick={() => {
          navigate("/wallets");
          setActivePage("wallets");
        }}
        className={`${activePage === "wallets" ? "text-primaryColor" : ""}`}
      />
      <MobileNavLink
        icon={
          <>
            <ChartPieSlice
              size={25}
              weight="fill"
              className={`${activePage === "weekly-spendings" ? "" : "hidden"}`}
            />
            <ChartPieSlice
              size={25}
              // weight="fill"
              className={`${activePage === "weekly-spendings" ? "hidden" : ""}`}
            />
          </>
        }
        name="weekly spendings"
        onClick={() => {
          navigate(`/weeks/${weeks[0].id}`);
          setActivePage("weekly-spendings");
        }}
        className={`${
          activePage === "weekly-spendings" ? "text-primaryColor" : ""
        }`}
      />
    </div>
  );
};

export default MobileNavBar;
