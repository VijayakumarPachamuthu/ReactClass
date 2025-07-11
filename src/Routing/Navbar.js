import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./Sidebar";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars ">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Link className="navbar-brand mx-3" to="/" style={{ color: "white" }}>
            🌐 MyReactSite
          </Link>
          <div className="d-flex flex-row ms-auto align-items-center">
            <Link className="mx-3 nav-link text-white" to="/">
              🏠 Home
            </Link>
            <Link className="mx-3 nav-link text-white" to="/about">
              ℹ️ Redux
            </Link>
            <Link className="mx-3 nav-link text-white" to="/contact">
              ✉️ Contact
            </Link>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <div className={sidebar ? "main-content shifted" : "main-content"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
