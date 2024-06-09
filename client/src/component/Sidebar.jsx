import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AiFillEnvironment } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";

import { FaPaw, FaBriefcaseMedical, FaWpforms } from "react-icons/fa";

import {
  RiSearchEyeLine,
  RiImageAddFill,
  RiMailUnreadFill,
} from "react-icons/ri";

import {
  BsFileEarmarkRichtextFill,
  BsFillBarChartLineFill,
  BsReverseLayoutTextWindowReverse,
} from "react-icons/bs";

import ToggleMode from "./ToggleMode.jsx";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const menus = [
    { title: "Dashboard", path: "/" },
    {
      title: "Adoption",
      spacing: true,
      icon: <FaPaw />,
      path: "/Adoption",
    },
    { title: "Rescue", icon: <FaBriefcaseMedical />, path: "/rescue" },
    { title: "Forms", icon: <FaWpforms />, path: "/forms" },
    { title: "Inbox", icon: <RiMailUnreadFill /> },
    {
      title: "Profile",
      spacing: true,
      icon: <RiImageAddFill />,
      path: "/profile",
    },
    {
      title: "Dark Mode",
      icon: <BsFileEarmarkRichtextFill />,
    },
    {
      title: "Logout",
      icon: <BsReverseLayoutTextWindowReverse />,
      path: "/logout",
    },
  ];

  return (
    <section
      className={`relative h-screen shadow-2xl dark:shadow-dark-3xl p-5 pt-8 duration-300 ${
        open ? "w-72" : "w-20"
      }`}
    >
      <div>
        <FaArrowLeft
          className={`dark:bg-cyber-blue bg-slate-blue 
        text-pale-blue text-3xl p-2 rounded-full 
          absolute -right-3 top-9 cursor-pointer ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
      </div>
      {/* LOGO */}
      <div className="inline-flex">
        <AiFillEnvironment
          className={`text-pale-blue text-4xl rounded-md cursor-pointer block duration-500 float-left mr-2 ${
            open && "rotate-[360deg]"
          }  p-2 dark:bg-cyber-blue bg-slate-blue `}
        />
        <h1
          className={`text-black-text dark:text-white-primary origin-left duration-300 font-bold text-xl flex items-center ${
            !open && "scale-0"
          }`}
        >
          PET PALACE
        </h1>
      </div>

      {/* SEARCH BAR */}
      <div
        className={`flex items-center rounded-md bg-white-second dark:bg-pale-blue mt-6 py-2 ${
          !open ? " px-2.5" : "px-4"
        }`}
      >
        <RiSearchEyeLine
          className={`text-slate-blue dark:text-cyber-blue text-lg block float-left cursor-pointer ${
            open && "mr-2"
          }`}
        />

        <input
          type="text"
          placeholder="Search"
          className={`text-base bg-transparent w-full text-black-text dark:text-white-primary  placeholder:text-black-text 
        dark:placeholder:text-white-primary placeholder:font-medium focus:outline-none font-semibold ${
          !open && "hidden"
        }`}
        />
      </div>

      {/* MENU ITEM BAR */}
      <ul className="relative pt-2">
        <div
          className={`absolute -right-10 ${open ? "bottom-16" : "bottom-8"}`}
        >
          <ToggleMode />
        </div>
        {menus.map((menu) => (
          <li
            key={menu.title}
            className={`text-black-text dark:text-white-primary text-sm flex 
          items-center gap-x-4 cursor-pointer mt-2 ${
            menu.spacing ? "mt-[2.8rem]" : "mt-3"
          }`}
          >
            <span className="text-2xl block float-left text-slate-blue   dark:text-cyber-blue">
              {menu.icon ? menu.icon : <MdDashboard />}
            </span>
            <Link
              to={menu.path}
              className={`text-base font-medium duration-300 flex-1 hover:bg-accent-light 
            dark:hover:bg-accent-dark p-2 rounded-md ${!open && "hidden"}`}
            >
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
