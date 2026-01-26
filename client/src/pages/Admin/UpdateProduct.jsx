import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Select, Button, Input } from "antd";
import { MinusOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {useNavigate , useParams} from "react-router-dom"
import {Modal} from "antd"

const { Option } = Select;
const UpdateProduct = () => {
      const [categories, setCategories] = useState([]);
      const [category, setCategory] = useState("");
      const [photo, setPhoto] = useState(null);
      const [preview, setPreview] = useState(null);
    
      const [name, setName] = useState("");
      const [description, setDescription] = useState("");
      const [price, setPrice] = useState("");
      const [quantity, setQuantity] = useState("");
      const [shipping, setShipping] = useState(false);
      const [product,setProductId] = useState("")
    
      const fileInputRef = useRef(null);
      const navigate = useNavigate()
      const params = useParams();

//get single product
const getSingleProduct = async () =>{
    try{
        const {data} = await axios.get(`/api/v1/product/getsingle-product/${params.slug}`)
        setProductId(data.product._id)
        setName(data.product.name)
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setCategory(data.product.category._id);
      setShipping(data.product.shipping);

    }
    catch(error){
        console.log(error);
              toast.error("Failed to load product");

    }
}


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
    getSingleProduct(),
    getAllCategory();
// eslint-disable-next-line
  }, []);

  // ================= IMAGE PREVIEW =================
  useEffect(() => {
    if (!photo) return;

    const objectUrl = URL.createObjectURL(photo);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !quantity || !category ) {
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
      photo && productData.append("photo", photo);
      const { data } = await axios.put(`/api/v1/product/update-product/${product}`, productData);

      if (data?.success){
        toast.success('Product Updated Successfully')
        navigate('/dashboard/admin/product')
      }else{
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

///delete function
//   const handleDeleteProduct = async () =>{
//     try{
//         let answer = window.prompt('Are you sure want to delete product?')
//         if(!answer) return
//         const {data} = await axios.delete(`/api/v1/product/delete-product/${product}`)
//         toast.success("Item Deleted Succesfully")
//         navigate('/dashboard/admin/product')
//     }catch(error){
//         console.log(error);
//         toast.error("Error While Deleting Product")
//     }

//   }
const handleDeleteProduct = async() =>{
    Modal.confirm({
title: "Delete Product",
content: "Are you sure want to delete this product?",
okText:"Yes, Delete",
okType:"danger",
cancelText:"Cancel",
async onOk(){
    try{
        const {data} = await axios.delete(`/api/v1/product/delete-product/${product}`)
       toast.success("Item Deleted Succesfully")
 navigate('/dashboard/admin/product')
    }catch(error){
        console.log(error);
        toast.error("Error While Deleting")
    }
}   
})
}
  return (
  <div style={{ maxWidth: "420px" }}>
      <h2>Update Product</h2>

      {/* CATEGORY */}
      <Select
        placeholder="Select Category"
        size="large"
        style={{ width: "100%", marginBottom: 16 }}
        onChange={setCategory}
        value={category}
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
        onChange={(value) => setShipping(value === "1")}
        value={shipping ? "1" : "0"}
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
      {preview ? (
        <img
          src={preview}
          alt="preview"
          height="200"
          style={{
            borderRadius: 8,
            border: "1px solid #ddd",
            objectFit: "cover",
            marginBottom: 16,
          }}
        />
      ) : product ? (
          <img
            src={`/api/v1/product/product-photo/${product}`}
          alt="preview"
          height="150"
          style={{
            borderRadius: 8,
            border: "1px solid #ddd",
            objectFit: "cover",
            marginBottom: 16,
          }}
        />
      ) : null}
      <Button
      type="primary"
        icon={<PlusOutlined />}
      onClick={handleUpdateProduct}

      >
        Update Product
      </Button>
         <Button
      type="secondary"
        icon={<MinusOutlined />}
      onClick={handleDeleteProduct}

      >
        Delete Product
      </Button>
    </div>  )
}

export default UpdateProduct