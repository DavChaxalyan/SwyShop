import React, { useState } from "react";
import {jwtDecode} from "jwt-decode";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import ProductModal from "../Modal/Modal";
import Button from "react-bootstrap/Button";
import { addProductInCart } from "../../redux/actions/addProductActions";

const ProductCard = ({ products }) => {
  const cartItems = useSelector((state) => state.products.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState(null);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token'); 
  
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        return decodedToken.userId; 
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null; 
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleAddToCart = (id) => {
    const token = localStorage.getItem('token')
    dispatch(addProductInCart(id,token));
  };

  const handleProductPage = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={styles.mainProductsBlock}>
      <ProductModal
        products={products}
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        userId={getUserIdFromToken()}
      />
      {products?.map((product) => {
        return (
          <div
          key={product.id}
          className={styles.productCard}
          onClick={() => handleProductPage(product.id || product._id)}
          >
            <div className={styles.imageContainer}>
              <img
                src={
                  product.statimage
                    ? product.statimage
                    : `http://localhost:5000/${product.image}`
                }
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.seeButton}>
                <Button
                  variant="light"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalShow(true);
                    setProduct(product);
                  }}
                >
                  fast see
                </Button>
              </div>
            </div>
            <p className={styles.price}>
              {product.oldPrice ? (
                <>
                  <span className={styles.oldPrice}>${product.oldPrice}</span>
                  <span className={styles.newPrice}>${product.price}</span>
                </>
              ) : (
                <span className={styles.newPrice}>${product.price}</span>
              )}
            </p>
            <h3 className={styles.productName}>{product.name}</h3>
            <div className={styles.productRatingBlock}>
              <div className={styles.productRating}>
                <FaStar style={{ fill: "#ff7d00" }} />
                <span>{product.rating}</span>
              </div>
              <span style={{ fontSize: "13px", color: "gray" }}>
                {product.reviewsCount} ratings
              </span>
            </div>
            <div className={styles.buttonContainer}>
              {!product?.whoInCart?.includes(getUserIdFromToken()) ? (
                <Button
                  className={styles.addToCart}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart((product._id || product.id));
                  }}
                >
                  <FaShoppingCart />
                  Add to cart
                </Button>
              ) : (
                <Button
                  className={styles.inCart}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/cart");
                  }}
                >
                  <FaShoppingCart />
                  In cart
                </Button>
              )}
              <div className={styles.heartButtonBlock}>
                <button
                  className={styles.like}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                >
                  {liked ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
