import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./components/Login";
import Register from "./components/Register";
import DishList from "./components/DishList";
import DishUpdate from "./components/DishUpdate";
import DishAdd from "./components/DishAdd";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dishes" element={<DishList />} />
          <Route path="/dishes/edit" element={<DishUpdate />} />
          <Route path="/dishes/add" element={<DishAdd />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
