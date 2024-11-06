import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import {
  deleteProduct,
  getMyProducts,
} from "../../redux/actions/productActions";
import { Button } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styles from "./MyProduct.module.css";
import NoProductsFound from "../Errors/NoProductsFound";
import { useTranslation } from "react-i18next";

const MyProducts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myProducts = useSelector((state) => state.products);
  const { loading, error, products } = myProducts;

  useEffect(() => {
    dispatch(getMyProducts());
  }, [dispatch]);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const token = localStorage.getItem("token");
      await dispatch(deleteProduct(productId, token));
    }
  };

  return (
    <>
      {loading ? (
        <h2>{t("my-products-waiting")}</h2>
      ) : error ? (
        <h2>Error: {error}</h2>
      ) : products && Array.isArray(products) && products.length > 0 ? (
        <div className={styles.mainProductBlock}>
          <span className={styles.titleProducts}>{t("my-products-title")}</span>
          <div className={styles.mainProductsBlock}>
            {products?.map((product) => {
              return (
                <div
                  key={product.id || product._id}
                  className={styles.productCard}
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
                  </div>
                  <p className={styles.price}>
                    {product.oldPrice ? (
                      <>
                        <span className={styles.oldPrice}>
                          ${product.oldPrice}
                        </span>
                        <span className={styles.newPrice}>
                          ${product.price}
                        </span>
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
                      {product.reviewsCount} {t("my-products-rating")}
                    </span>
                  </div>
                  <div className={styles.buttonContainer}>
                    <Button
                      className={styles.inCart}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit-product/${product._id}`);
                      }}
                    >
                      <FaRegEdit />
                      {t("my-products-edit-button")}
                    </Button>
                    <RiDeleteBin6Fill
                      style={{ color: "red", fontSize: "23px" }}
                      onClick={() => handleDeleteProduct(product._id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <NoProductsFound />
      )}
    </>
  );
};

export default MyProducts;
