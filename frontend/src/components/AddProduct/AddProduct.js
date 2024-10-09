import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/actions/productActions";
import styles from "./AddProduct.module.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('image', productData.image); 
    formData.append('category', productData.category);
    formData.append('color', productData.color);
    formData.append('quantity', 1);
    formData.append('rating', 3.5);
    formData.append('reviewsCount', 7);
    formData.append('date', new Date().toLocaleDateString());

    const token = localStorage.getItem('token');
    await dispatch(addProduct(formData, token));
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
    <form onSubmit={handleSubmit} className={styles.formContainer}>
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
          <img src={imagePreview} className={styles.imagePreview} alt="Preview" />
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
      <button className="formButton" type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
