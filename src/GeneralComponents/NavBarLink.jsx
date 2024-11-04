import React from "react";
import { twMerge } from "tailwind-merge";

const NavBarLink = ({ icon, name, onClick, className }) => {
  return (
    <li
      onClick={onClick}
      className={twMerge(
        `font-semibold hover:text-primaryColor cursor-pointer transition-colors duration-300 flex gap-1 items-center`,
        className
      )}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </li>
  );
};

export default NavBarLink;
