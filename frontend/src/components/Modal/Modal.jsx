import styles from "./Modal.module.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addProductInCart } from "../../redux/actions/cartProductActions";
import { getUserIdFromToken } from "../../Utils/utils";

function ProductModal(props) {
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
                ? `http://localhost:5000/${props?.product?.statimage}`
                : `http://localhost:5000/${props?.product?.image}`
            }
            alt="Description"
          />
        </div>
        <div className={styles.containerBlock}>
          <div className={styles.blockTextName}>
            <h2>{props?.product?.name}</h2>
          </div>
          <div className={styles.categoryBlock}>
            <p>Category: {props?.product?.category}</p>
          </div>
          <div className={styles.ratingBlock}>
            <div className={styles.ratingBox}>
              <p>{props?.product?.rating}</p>
              <div>
                <FaStar style={{ fill: "#ff7d00" }} className={styles.star} />
              </div>
            </div>
            <i>Reviews: {props?.product?.reviewsCount}</i>
          </div>
          <div className={styles.DateBlock}>
            <p>Date: {props?.product?.date}</p>
          </div>
          <div className={styles.priceBlock}>
            <p>Price: ${props?.product?.price}</p>
            {props?.product?.oldPrice && (
              <del>
                <p>Old Price: ${props?.product?.oldPrice}</p>
              </del>
            )}
          </div>
          <p>Color: {props?.product?.color}</p>
          {getUserIdFromToken() !== props?.product?.user ? (
                !isInCart ? (
                  <Button
                    className={styles.addToCart}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(props?.product?.id || props?.product?._id);
                    }}
                  >
                    <FaShoppingCart /> Add to cart
                  </Button>
                ) : (
                  <Button
                    className={styles.inCart}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/cart");
                    }}
                  >
                    <FaShoppingCart /> In cart
                  </Button>
                )
              ) : (
                <span className={styles.productMessage}>Your Product</span>
              )}
        </div>
      </div>
      <Modal.Footer className="p-0">
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;
