import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Advert from "./Pages/Advert";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import Products from "./Pages/Products";
import './App.css';
import Admin from "./Pages/Admin";

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Products/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="/advert" element={<Advert/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </div>
    </Router>
  );
}