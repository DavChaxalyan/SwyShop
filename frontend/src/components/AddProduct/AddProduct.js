import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../../redux/actions/productActions";
import "./AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: null,
    category: "",
    color: "",
    date: new Date().toLocaleDateString(),
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProductData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...productData,
      image: imagePreview,
    };
    dispatch(addNewProduct(newProduct));
    setProductData({
      name: "",
      price: "",
      image: null,
      category: "",
      color: "",
      date: new Date().toLocaleDateString(),
    });
    setImagePreview(null);
    navigate('/')
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <label>
        Product Name:
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Enter product price"
          required
        />
      </label>
      <label>
        Product image:
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </label>
      {imagePreview && (
        <div>
          <h4>Image Preview:</h4>
          <img src={imagePreview} alt="Preview" />
        </div>
      )}
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleChange}
          placeholder="Enter product category"
          required
        />
        <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Clothing">Clothing</option>
            <option value="Audio">Audio</option>
          </select>
      </label>
      <label>
        Color:
        <input
          type="text"
          name="color"
          value={productData.color}
          onChange={handleChange}
          placeholder="Enter product color"
          required
        />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
