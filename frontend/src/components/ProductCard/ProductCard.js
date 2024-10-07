import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/productActions";
import { FaStar } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import ProductModal from "../Modal/Modal";
import Button from "react-bootstrap/Button";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState(null);


  const handleLike = () => {
    setLiked(!liked);
  };

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
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
      />
      {products?.map((product) => {
        return (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => handleProductPage(product.id)}
          >
            <div className={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.seeButton}>
                <Button variant="light" onClick={(e) => {
                  e.stopPropagation();
                  setModalShow(true);
                  setProduct(product)
                }}>
                  fast see
                </Button>
              </div>
            </div>
            <p className={styles.price}>
              <span className={styles.oldPrice}>${product.oldPrice}</span> $
              {product.price}
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
              {!product.isInCart ? (
                <Button
                  className={styles.addToCart}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product.id)
                  }}
                >
                  <FaShoppingCart />
                  Add to cart
                </Button>
              ) : (
                <Button className={styles.inCart} onClick={(e) => {
                  e.stopPropagation()
                  navigate('/cart')
                }}>
                  <FaShoppingCart />
                  In cart
                </Button>
              )}
              <div className={styles.heartButtonBlock}>
                <button className={styles.like} onClick={(e) => {
                  e.stopPropagation()
                  handleLike()
                }}>
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
