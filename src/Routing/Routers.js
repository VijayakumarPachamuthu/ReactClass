import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Navbar";
import ToDoList from "./ToDoList";
import GetEmpList from "../CRUD/GetEmpList";
import Post from "../CRUD/Post";
import Forms from "../PropsParentChild/PropsPassIng/Forms";


function Routers() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/parantchild" element={<Forms />} />
          <Route path="/todolist" element={<ToDoList />} />
          <Route path="/getEmpList" element={<GetEmpList />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Routers;
