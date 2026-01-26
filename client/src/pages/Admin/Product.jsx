import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Card, Col, Row, Spin } from "antd";
import {Link} from "react-router-dom"

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to load product");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
if (loading) {
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <Spin size="large" />
    </div>
  );
}

  return (
    <div>
      <h2>All Products</h2>
      <Row gutter={[16,16]}>
        {products.map((p) => (
       <Col xs={24} sm={12} md={8} lg={6} key={p._id}>
       <Link to={`/dashboard/admin/product/${p.slug}`} >
          <Card 
          hoverable 
          cover={
            <img
            alt={p.name}
            src={`/api/v1/product/product-photo/${p._id}`}
            style={{height:200, objectFit:"cover"}}
            />
          }
          >
            <Card.Meta title={p.name} description={`₹ ${p.price} ${p.description}`}  />
          </Card></Link>
       </Col>
        ))}
      </Row>
    </div>
  );
};

export default Product;
