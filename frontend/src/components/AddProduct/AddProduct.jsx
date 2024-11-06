import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/actions/productActions";
import styles from "./AddProduct.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";

const AddProduct = () => {
  const { t } = useTranslation();
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
      <h2 className="my-4 text-center">{t("add-product-form-title")}</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">{t("add-product-form-label1")}</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className={`form-control ${styles.inputTextNumberFile}`}
            placeholder={t("add-product-form-placeholder1")}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t("add-product-form-label2")}</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className={`form-control ${styles.inputTextNumberFile}`}
            placeholder={t("add-product-form-placeholder2")}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t("add-product-form-label3")}</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={`form-control ${styles.inputTextNumberFile}`}
            required
          />
        </div>
        {imagePreview && (
          <div className="mb-3">
            <h4>{t("add-product-form-image-preview")}</h4>
            <img src={imagePreview} className="img-fluid rounded" alt="Preview" style={{width: '100%', height: '400px'}} />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">{t("add-product-form-label4")}</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className={`form-control ${styles.inputTextNumberFile}`}
            placeholder={t("add-product-form-placeholder4")}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t("add-product-form-label5")}</label>
          <input
            type="text"
            name="color"
            value={productData.color}
            onChange={handleChange}
            className={`form-control ${styles.inputTextNumberFile}`}
            placeholder={t("add-product-form-placeholder5")}
            required
          />
        </div>
        <button className={`btn btn-primary w-100 ${styles.formButton}`} type="submit">{t("add-product-form-add-product-button")}</button>
      </form>
    </div>
  );
};

export default AddProduct;
