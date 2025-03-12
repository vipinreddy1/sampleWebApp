import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router";
import Products from "./Products";
import ProductDetails from "./ProductDetails"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/products/" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
