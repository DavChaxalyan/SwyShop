import styles from "./Modal.module.css";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/productActions";

function ProductModal(props) {
    const [inCart, setInCart] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.products.cart);

    const handleAddToCart = (id) => {
        dispatch(addToCart(id));
    };

    useEffect(() => {
        const isProductInCart = cartItems.some((item) => item?.id === props?.product?.id);
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
                    <img src={props?.product?.image} alt="Description" />
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
                            <FaStar style={{ fill: "#ff7d00" }} className={styles.star} />
                            <p>{props?.product?.rating}</p>
                        </div>
                        <i>Reviews: {props?.product?.reviewsCount}</i>
                    </div>
                    <div className={styles.DateBlock}>
                        <p>Date: {props?.product?.date}</p>
                    </div>
                    <div className={styles.priceBlock}>
                        <p>Price: {props?.product?.price}</p>
                        <del><p>Old Price: {props?.product?.oldPrice}</p></del>
                    </div>
                    <p>Color: {props?.product?.color}</p>
                    {!inCart ? (
                        <Button
                            className={styles.addToCart}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(props?.product.id);
                            }}
                        >
                            <FaShoppingCart /> Add to cart
                        </Button>
                    ) : (
                        <Button
                            className={styles.inCart}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate('/cart');
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
