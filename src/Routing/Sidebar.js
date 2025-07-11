import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Parant To Child",
    path: "/parantchild",
    icon: <AiIcons.AiFillBook />,
    cName: "nav-text",
  },
  {
    title: "ToDoList",
    path: "/todolist",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Contact",
    path: "/contact",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Redux",
    path: "/about",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "GetEmpList",
    path: "/getEmpList",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
