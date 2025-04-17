import styles from "./Modal.module.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addProductInCart } from "../../redux/actions/cartProductActions";
import { formatCurrency, getUserIdFromToken, priceFix } from "../../Utils/utils";
import { useTranslation } from "react-i18next";

function ProductModal(props) {
  const { t } = useTranslation();
  const { currency, exchangeRates } = useSelector((state) => state.currency);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isInCart, setIsInCart] = useState(
    props?.product?.whoInCart.some(
      (user) => user.userId.toString() === getUserIdFromToken()
    )
  );

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      await dispatch(addProductInCart(id, token)).then(() => {
        setIsInCart(true);
      });
      return;
    }
    navigate("/login");
    setTimeout(() => {
      alert("You need to log in or register to add to cart.");
    }, 500);
  };

  useEffect(() => {
    setIsInCart(
      props?.product?.whoInCart.some(
        (user) => user.userId.toString() === getUserIdFromToken()
      )
    );
  }, [props?.product, props?.userId]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={styles.modalContainer}>
        <div className={styles.imageBlock}>
          <img
            src={
              props?.product?.statimage
                ? `https://swyshop.onrender.com/${props?.product?.statimage}`
                : `https://swyshop.onrender.com/${props?.product?.image}`
            }
            alt="Description"
          />
        </div>
        <div className={styles.containerBlock}>
          <div className={styles.blockTextName}>
            <h2>{props?.product?.name}</h2>
          </div>
          <div className={styles.categoryBlock}>
            <p>
              {t("modal-form-input-lb1")}: {props?.product?.category}
            </p>
          </div>
          <div className={styles.ratingBlock}>
            <div className={styles.ratingBox}>
              <p>{props?.product?.rating}</p>
              <div>
                <FaStar style={{ fill: "#ff7d00" }} className={styles.star} />
              </div>
            </div>
            <i>
              {t("modal-form-input-lb2")}: {props?.product?.reviewsCount}
            </i>
          </div>
          <div className={styles.DateBlock}>
            <p>
              {t("modal-form-input-lb3")}: {props?.product?.date}
            </p>
          </div>
          <div className={styles.priceBlock}>
            <p>
              {t("modal-form-input-lb4")}: {formatCurrency(priceFix(currency, props?.product?.price, exchangeRates), currency)}
            </p>
            {props?.product?.oldPrice && (
              <del>
                <p>
                  {t("modal-form-input-lb5")}: {formatCurrency(priceFix(currency, props?.product?.oldPrice, exchangeRates), currency)}
                </p>
              </del>
            )}
          </div>
          <p>{t("modal-form-input-lb6")}: {props?.product?.color}</p>
          {getUserIdFromToken() !== props?.product?.user ? (
            !isInCart ? (
              <Button
                className={styles.addToCart}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(props?.product?.id || props?.product?._id);
                }}
              >
                <FaShoppingCart /> {t("modal-form-input-add-cart")}
              </Button>
            ) : (
              <Button
                className={styles.inCart}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/cart");
                }}
              >
                <FaShoppingCart /> {t("modal-form-input-in-cart")}
              </Button>
            )
          ) : (
            <span className={styles.productMessage}>
              {t("modal-form-input-your-product")}
            </span>
          )}
        </div>
      </div>
      <Modal.Footer className="p-0">
        <Button onClick={props.onHide}>{t("modal-form-input-close")}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;
