import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Select, Button, Input } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {useNavigate } from "react-router-dom"

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate()

  // ================= GET CATEGORIES =================
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      } else {
        toast.error("Failed to load categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // ================= IMAGE PREVIEW =================
  useEffect(() => {
    if (!photo) return;

    const objectUrl = URL.createObjectURL(photo);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !quantity || !category || !photo) {
  toast.error("Please fill all required fields");
  return;
}

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("photo", photo);
      const { data } = await axios.post("/api/v1/product/create-product", productData);

      if (data?.success){
        toast.success('Product Created Successfully')
        navigate('/dashboard/admin/products')
      }else{
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div style={{ maxWidth: "420px" }}>
      <h2>Create Product</h2>

      {/* CATEGORY */}
      <Select
        placeholder="Select Category"
        size="large"
        style={{ width: "100%", marginBottom: 16 }}
        onChange={setCategory}
      >
        {categories.map((c) => (
          <Option key={c._id} value={c._id}>
            {c.name}
          </Option>
        ))}
      </Select>

      {/* NAME */}
      <Input
        size="large"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {/* DESCRIPTION */}
      <Input.TextArea
        rows={3}
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {/* PRICE */}
      <Input
        size="large"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {/* QUANTITY */}
      <Input
        size="large"
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {/* SHIPPING */}
      <Select
        placeholder="Shipping Available?"
        size="large"
        style={{ width: "100%", marginBottom: 16 }}
        onChange={setShipping}
      >
        <Option value="0">No</Option>
        <Option value="1">Yes</Option>
      </Select>

      {/* IMAGE UPLOAD */}
      <Button
        icon={<UploadOutlined />}
        style={{ marginBottom: 16 }}
        onClick={() => fileInputRef.current.click()}
      >
        {photo ? photo.name : "Upload Photo"}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => setPhoto(e.target.files[0])}
      />

      {/* IMAGE PREVIEW */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          height="200"
          style={{
            borderRadius: 8,
            border: "1px solid #ddd",
            objectFit: "cover",
          }}
        />
      )}
      <Button
      type="primary"
        icon={<PlusOutlined />}
      onClick={handleCreateProduct}

      >
        Create Product
      </Button>
    </div>
  );
};

export default CreateProduct;
