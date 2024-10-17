import React, { useEffect, useState } from "react";
import styles from "./EditProduct.module.css";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { putProduct } from "../../redux/actions/productActions";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [foundProduct, setFoundProduct] = useState(null);
  const myProducts = useSelector((state) => state.products.items);
  const [imagePreview, setImagePreview] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: null,
    category: "",
    color: "",
    date: new Date().toLocaleDateString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("image", product.image);
    formData.append("category", product.category);
    formData.append("color", product.color);
    formData.append("quantity", 1);
    formData.append("rating", 3.5);
    formData.append("reviewsCount", 7);
    formData.append("id", id);
    formData.append("date", new Date().toLocaleDateString());

    const token = localStorage.getItem("token");
    await dispatch(putProduct(formData, token));
    setProduct({
      name: "",
      price: "",
      image: null,
      category: "",
      color: "",
      date: new Date().toLocaleDateString(),
    });
    navigate("/my-products");
    window.location.reload();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProduct((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  useEffect(() => {
    if (myProducts && myProducts.length > 0) {
      const product = myProducts.find((product) => product._id === id);
      setFoundProduct(product);
    }
  }, [id, myProducts]);

  return (
    <>
      <Link to={"/my-products"} className="d-flex align-items-center">
      <IoIosArrowBack/>
        <CgProfile style={{marginLeft: '2px', marginRight: '5px'}} />
        Back To My Products
      </Link>
      <div className={styles.mainBlockEdit}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Edit Product</h2>

          <label className={styles.label}>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
            required
          />

          <label className={styles.label}>Category:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product category"
            required
          />

          <label className={styles.label}>Color:</label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
            className={styles.input}
            placeholder="Color Name"
          />

          <button type="submit" className={styles.submitButton}>
            Save Changes
          </button>
        </form>
        {foundProduct && (
          <div className={styles.mainProductsBlock}>
            <div
              key={foundProduct.id || foundProduct._id}
              className={styles.productCard}
            >
              <div className={styles.imageContainer}>
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : foundProduct.statimage
                      ? `http://localhost:5000/${foundProduct.statimage}`
                      : `http://localhost:5000/${foundProduct.image}`
                  }
                  alt={foundProduct.name}
                  className={styles.productImage}
                />
              </div>
              <p className={styles.price}>
                {foundProduct.oldPrice ? (
                  <>
                    <span className={styles.oldPrice}>
                      Old Price: $
                      {product.price
                        ? foundProduct.price
                        : foundProduct.oldPrice}
                    </span>
                    <br />
                    New Price:{" "}
                    <span className={styles.newPrice}>
                      ${product.price || foundProduct.price}
                    </span>
                  </>
                ) : (
                  <span className={styles.newPrice}>
                    ${product.price || foundProduct.price}
                  </span>
                )}
              </p>
              <h3 className={styles.productName}>
                Name: {product.name || foundProduct.name}
              </h3>
              <div className={styles.productRatingBlock}>
                <div className={styles.productRating}>
                  By Default:
                  <FaStar style={{ fill: "#ff7d00" }} />
                  <span>{foundProduct.rating}</span>
                </div>
                <span style={{ fontSize: "13px", color: "gray" }}>
                  {foundProduct.reviewsCount} ratings
                </span>
              </div>
              <h3 className={styles.productName}>
                Category: {product.category || foundProduct.category}
              </h3>
              <h3 className={styles.productName}>
                Color: {product.color || foundProduct.color}
              </h3>
              <h3 className={styles.productName}>
                Updated Date: {product.date || foundProduct.date}
              </h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProduct;
