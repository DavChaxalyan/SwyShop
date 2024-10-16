import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/actions/productActions";
import styles from "./AddProduct.module.css"
import "bootstrap/dist/css/bootstrap.min.css";

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
    navigate('/');
  };

  return (
    <div className={`container ${styles.formContainer}`}>
      <h2 className="my-4 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Product Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product price"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
            required
          />
        </div>
        {imagePreview && (
          <div className="mb-3">
            <h4>Image Preview:</h4>
            <img src={imagePreview} className="img-fluid rounded" alt="Preview" style={{width: '100%', height: '400px'}} />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product category"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Color:</label>
          <input
            type="text"
            name="color"
            value={productData.color}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product color"
            required
          />
        </div>
        <button className={`btn btn-primary w-100 ${styles.formButton}`} type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
