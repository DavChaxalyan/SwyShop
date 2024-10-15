import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import ProductModal from "../Modal/Modal";
import Button from "react-bootstrap/Button";
import {
  addProductInFavorite,
  deleteProductInFavorite,
} from "../../redux/actions/favoriteProductActions";
import { addProductInCart } from "../../redux/actions/cartProductActions";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState(null);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  };

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
     await dispatch(addProductInCart(id, token));
     return 
    }
    navigate('/login')
    setTimeout(() => {
      alert('You need to log in or register to add to cart.')
    }, 500)
  };

  const handleProductPage = (id) => {
    navigate(`/product/${id}`);
  };

  const addToFavorite = (id) => {
    if (localStorage.getItem("token")) {
      dispatch(addProductInFavorite(id, localStorage.getItem("token")));
      return
    }
    navigate('/login')
    setTimeout(() => {
      alert('You need to log in or register to add to favorite.')
    }, 500)
  };

  const deleteToFavorite = async (id) => {
    await dispatch(deleteProductInFavorite(id, localStorage.getItem("token")));
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
            key={product.id || product._id}
            className={styles.productCard}
            onClick={() => handleProductPage(product.id || product._id)}
          >
            <div className={styles.imageContainer}>
              <img
                src={
                  product.statimage
                    ? `http://localhost:5000/${product.statimage}`
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
                    handleAddToCart(product._id || product.id);
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
                <button className={styles.like}>
                  {!product?.whoInFavorite?.includes(getUserIdFromToken()) ? (
                    <FaRegHeart
                      onClick={(e) => {
                        e.stopPropagation();
                        addToFavorite(product.id || product._id);
                      }}
                      style={{
                        color: "gray",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                    />
                  ) : (
                    <IoMdHeart
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteToFavorite(product.id || product._id);
                      }}
                      style={{
                        color: "red",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                    />
                  )}
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
