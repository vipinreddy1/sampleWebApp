import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardMedia, CardContent } from "@mui/material";
import logo from "./logo.jpg";
import "./App.css";
const ProductDetails = (id) => {
  const [authorized, setAuthorized] = useState(false);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  if (!localStorage.getItem("authToken")) {
    navigate("/");
  }
  useEffect(() => {
    const fetchProducts = async () => {
      let response = await fetch(`http://localhost:10000/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.status === 401) {
        setAuthorized(false);
        alert("You are not authorized to view this page, please login");
        navigate("/");
      } else if (response.status === 200) {
        setAuthorized(true);
        const productData = await response.json();
        setProduct(productData.products);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="products">
      {authorized && (
        <Card sx={{ maxWidth: 200, margin: "16px auto" }}>
          <CardMedia
            style={{ height: 0, paddingTop: "56%" }}
            image={logo}
            sx={{ height: 140 }}
          />
          <CardContent>
            This is {product.productName}, product ID is {product.product_id}
            and it costs {product.price}, and belongs to {product.category}.
            Number of records is {product.record_count}.
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductDetails;
