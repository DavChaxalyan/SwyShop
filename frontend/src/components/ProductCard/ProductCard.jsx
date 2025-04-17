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
import { formatCurrency, getUserIdFromToken, priceFix } from "../../Utils/utils";
import { useTranslation } from "react-i18next";

const ProductCard = ({ products }) => {
  const { t } = useTranslation();
  const { orders } = useSelector((state) => state.order);
  const { currency, exchangeRates } = useSelector((state) => state.currency);
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
    if (orders) {
      const userOrders = orders.filter(
        (orderItem) => orderItem.customerId === currentUserId
      );
      const productIds = userOrders.flatMap((orderItem) =>
        orderItem.items.map((item) => item.productId._id)
      );
      setOrderedProductIds(productIds);
    }
  }, [orders, currentUserId]);

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      await dispatch(addProductInCart(id, token));
      return;
    }
    navigate("/login");
    alert(t("product-cart-button-add-cart-no-login"));
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
    alert(t("product-cart-button-add-favorite-no-login"));
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
                    ? `https://swyshop.onrender.com/${product.statimage}`
                    : `https://swyshop.onrender.com/${product.image}`
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
                  {t("product-cart-lb2")}
                </Button>
              </div>
              {isOrdered && (
                <span className={styles.orderedIndicator}>{t("product-cart-lb1")}</span>
              )}
            </div>
            <p className={styles.price}>
              {product.oldPrice ? (
                <>
                  <span className={styles.oldPrice}>{formatCurrency(priceFix(currency, product.oldPrice, exchangeRates), currency)}</span>
                  <span className={styles.newPrice}>{formatCurrency(priceFix(currency, product.price, exchangeRates), currency)}</span>
                </>
              ) : (
                <span className={styles.newPrice}>{formatCurrency(priceFix(currency, product.price, exchangeRates), currency)}</span>
              )}
            </p>
            <h3 className={styles.productName}>{product.name}</h3>
            <div className={styles.productRatingBlock}>
              <div className={styles.productRating}>
                <FaStar style={{ fill: "#ff7d00" }} />
                <span>{product.rating}</span>
              </div>
              <span style={{ fontSize: "13px", color: "gray" }}>
                {product.reviewsCount} {t("product-cart-lb3")}
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
                    {t("product-cart-button-add-cart")}
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
                    {t("product-cart-button-in-cart")}
                  </Button>
                )
              ) : (
                <span className={styles.productMessage}>{t("modal-form-input-your-product")}</span>
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
