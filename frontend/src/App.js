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

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Produkty</Link>
            </li>
            <li>
              <Link to="/cart">Košík</Link>
            </li>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Products/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="/advert" element={<Advert/>}/>
        </Routes>
      </div>
    </Router>
  );
}