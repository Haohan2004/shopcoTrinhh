import { useState } from 'react'

import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from './Components/Home.jsx'
import Product from './Component/Product'
import Customer from "./Components/Customer.jsx";
import Navbar from "./Components/Navbar.jsx";
import Order from './Components/Order.jsx'
function App() {


  return (
    <>
        <main>
            <div className="fixed left-0 top-30 ">
                <Navbar className=""/>
            </div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="san-pham" element={<Product/>} />
                <Route path="khach-hang" element={<Customer/>} />
                <Route path="don-hang" element={<Order/>} />
            </Routes>
        </main>
    </>
  )
}

export default App
