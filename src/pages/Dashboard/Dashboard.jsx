import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import {
  FaCog,
  FaBars,
  FaTimes,
  FaInfoCircle,
  FaHeading,
  FaTools,
  FaBlog,
  FaProjectDiagram,
  FaAlignJustify,
  FaEnvelope,
  FaSignOutAlt,
  FaHome
} from "react-icons/fa";
import { TbLayoutNavbarInactive } from "react-icons/tb";
import { IoCodeWorking } from "react-icons/io5";
import { BsCardHeading } from "react-icons/bs";
import { MdContactMail } from "react-icons/md";

import NavbarPage from './../NavbarPage'
import HeroAndAbout from "../HeroAndAbout";
import Services from "../Services";
import WordMethod from "../WordMethod";
import ProjectsHeader from "../ProjectsHeader";
import ProjectLists from "./ProjectLists";
import Footer from "./Footer";
import ContactSection from "../ContactSection";
import Requests from "./Requests";


const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Welcome"); 
const [data, setdata] = useState()
const stats = [
  { title: "Admins", count: 1, color: "bg-blue-500" },
  { title: "Requests", count: 2, color: "bg-red-500" },
  { title: "Users", count: 10, color: "bg-yellow-500" },
  { title: "Reports", count: 5, color: "bg-purple-500" },
];


const handleLogout = () => {
  // Remove token or session data
  localStorage.removeItem("token"); // Example: Clearing authentication token
  sessionStorage.removeItem("user");

  // Redirect to login page
  window.location.href = "/admin/login"; // Change according to your route
};

  // Menu items with icons
  const menuItems = [
    { name: "Navbar", icon: <TbLayoutNavbarInactive /> },
    { name: "Hero & About", icon: <FaHeading /> },
    { name: "My Services", icon: <FaTools /> },
    { name: "Work Method", icon: <IoCodeWorking /> },
    { name: "Project Section", icon: <BsCardHeading /> },
    { name: "Projects", icon: <FaProjectDiagram /> },
    { name: "Footer", icon: <FaProjectDiagram /> },
    { name: "Contact", icon: <MdContactMail /> },
    { name: "Requests", icon: <MdContactMail /> },
    // { name: "SMTP Setup", icon: <MdContactMail /> },



  ];

  // Content for each menu item
  const pageContent = {
    Navbar: <NavbarPage/>,
    "Hero & About": <HeroAndAbout/>,
    "My Services": <Services/>,
    "Work Method": <WordMethod/>,
    "Project Section": <ProjectsHeader/>,
    Contact: <ContactSection/>,
    Projects: <ProjectLists/>,
    Footer: <Footer/>,
    Requests: <Requests/>,
    // "SMTP Setup": <p>hi</p>,



  };

  return (
    <div className="flex h-screen">
      {/* Sidebar (Drawer) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:relative md:translate-x-0`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`flex items-center gap-3 p-3 cursor-pointer ${
                  selectedPage === item.name ? "bg-blue-600 font-bold" : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  setSelectedPage(item.name);
                  setIsOpen(false);
                }}
              >
                {item.icon} {item.name}
              </li>
            ))}
            <li
  className="flex items-center gap-3 p-3 hover:bg-red-600 text-white cursor-pointer transition-all duration-300"
  onClick={handleLogout}
>
  <FaSignOutAlt />
  <span>Logout</span>
</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
            <FaBars size={20} />
          </button>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
           
            

            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <h1>admin</h1>
          </div>
        </header>
 {/* Welcome Message */}
 {selectedPage === "Welcome" && <div className="min-h-screen bg-gray-100">
      <div className="bg-green-500 text-white text-center p-3">
        <h1 className="text-2xl font-semibold">Welcome to Dashboard</h1>
      </div>

      
    </div>}

      
      
        {/* Dynamic Content Rendering */}
        <main className="flex-1 p-6">{pageContent[selectedPage]}</main>
      </div>
    </div>
  );
};

export default Dashboard;
