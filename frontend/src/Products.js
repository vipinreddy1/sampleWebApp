import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
} from "@mui/material";
import logo from "./logo.jpg";
import "./App.css";
const Products = () => {
  const [authorized, setAuthorized] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  if (!localStorage.getItem("authToken")) {
    navigate("/");
  }
  useEffect(() => {
    const fetchProducts = async () => {
      let response = await fetch("http://localhost:10000/Products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.status === 401) {
        setAuthorized(false);
        alert("You are not authorized to view this page,please login");
        navigate("/");
      } else if (response.status === 200) {
        setAuthorized(true);
        const productData = await response.json();
        setProducts(productData.products);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProductsBySearch = async () => {
      let response = await fetch(
        `http://localhost:10000/products?searchQuery=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.status === 401) {
        setAuthorized(false);
        alert("You are not authorized to view this page,please login");
        navigate("/");
      } else if (response.status === 200) {
        setAuthorized(true);
        const productData = await response.json();
        setProducts(productData.products);
      }
    };
    fetchProductsBySearch();
  }, [searchQuery]);

  return (
    <div>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Products
              <InputBase
                placeholder="Search products by name"
                inputProps={{ "aria-label": "search" }}
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: 1,
                  padding: "0 8px",
                  marginLeft: 2,
                  width: "300px",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <div className="products">
        {products.map((element, index) => (
          <Card key={index} sx={{ maxWidth: 200, margin: "16px auto" }}>
            <CardMedia
              style={{ height: 0, paddingTop: "56%" }}
              image={logo}
              sx={{ height: 140 }}
            />
            <CardContent>
              This is {element.productName}, product ID is {element.product_id}
              and it costs {element.price}, and belongs to {element.category}.
              Number of records is {element.record_count}.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
