import styles from "./Modal.module.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/productActions";
import { addProductInCart } from "../../redux/actions/addProductActions";

function ProductModal(props) {
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.products.cart);

  const handleAddToCart = (id) => {
    const token = localStorage.getItem('token')
    dispatch(addProductInCart(id,token));
  };

  useEffect(() => {
    const isProductInCart = cartItems.some(
      (item) => item?.id === props?.product?.id
    );
    setInCart(isProductInCart);
  }, [cartItems, props?.product?.id]);

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
              props?.product?.statimage ||
              `http://localhost:5000/${props?.product?.image}`
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
            <p>Price: {props?.product?.price}</p>
            {props?.product?.oldPrice ? (
              <del>
                <p>Old Price: {props?.product?.oldPrice}</p>
              </del>
            ) : (
              <></>
            )}
          </div>
          <p>Color: {props?.product?.color}</p>
          {!props?.product?.whoInCart?.includes(props?.userId) ? (
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
