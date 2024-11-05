import React, { useEffect, useState } from "react";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { Button } from "react-bootstrap";
import ProductModal from "../Modal/Modal";
import {
  addProductInFavorite,
  deleteProductInFavorite,
} from "../../redux/actions/favoriteProductActions";
import { addProductInCart } from "../../redux/actions/cartProductActions";
import { getOrders } from "../../redux/actions/orderActions";
import { getUserIdFromToken } from "../../Utils/utils";

const ProductCard = ({ products }) => {
  const { order } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState(null);
  const [orderedProductIds, setOrderedProductIds] = useState([]);
  const currentUserId = getUserIdFromToken();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    if (order?.orders) {
      const userOrders = order.orders.filter(
        (orderItem) => orderItem.customerId === currentUserId
      );
      const productIds = userOrders.flatMap((orderItem) =>
        orderItem.items.map((item) => item.productId._id)
      );
      setOrderedProductIds(productIds);
    }
  }, [order, currentUserId]);

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      await dispatch(addProductInCart(id, token));
      return;
    }
    navigate("/login");
    alert("You need to log in or register to add to cart.");
  };

  const handleProductPage = (id) => {
    navigate(`/product/${id}`);
  };

  const addToFavorite = (id) => {
    if (localStorage.getItem("token")) {
      dispatch(addProductInFavorite(id, localStorage.getItem("token")));
      return;
    }
    navigate("/login");
    alert("You need to log in or register to add to favorite.");
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
        userId={currentUserId}
      />
      {products?.map((product) => {
        const isOrdered = orderedProductIds.includes(product._id);

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
              {isOrdered && (
                <span className={styles.orderedIndicator}>Already Ordered</span>
              )}
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
              {getUserIdFromToken() !== product?.user ? (
                !product?.whoInCart.some(
                  (item) => item.userId.toString() === currentUserId
                ) ? (
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
                )
              ) : (
                <span className={styles.productMessage}>Your Product</span>
              )}
              <div className={styles.heartButtonBlock}>
                <button className={styles.like}>
                  {!product?.whoInFavorite?.includes(currentUserId) ? (
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
