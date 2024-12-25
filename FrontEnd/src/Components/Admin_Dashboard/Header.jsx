import {
  faBell,
  faCog,
  faPowerOff,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Header = () => {
  return (
    <div className="bg-white text-gray-700 p-4 shadow-sm flex items-center justify-end gap-8 text-[20px] px-8">
      <div className="p-2 bg-[#F0F0F0] rounded-full px-3 cursor-pointer relative">
        <FontAwesomeIcon icon={faBell} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          9+
        </span>
      </div>
      <FontAwesomeIcon icon={faUser} className="cursor-pointer" />
      <FontAwesomeIcon icon={faCog} className="cursor-pointer" />
      <FontAwesomeIcon icon={faPowerOff} className="cursor-pointer" />
    </div>
  );
};

export default Header;
