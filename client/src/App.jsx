import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./components/Login";
import Register from "./components/Register";
import DishList from "./components/DishList";
import DishUpdate from "./components/DishUpdate";
import DishAdd from "./components/DishAdd";
import Header from "./components/Header";
import Home from "./components/Home";
import DishDetails from './components/DishDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dishes" element={<DishList />} />
          <Route
            path="/dishes/edit/:dishId"
            element={
              <ProtectedRoute role="admin">
                <DishUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dishes/details/:dishId"
            element={<DishDetails />}
          />
          <Route
            path="/dishes/add"
            element={
              <ProtectedRoute role="admin">
                <DishAdd />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
