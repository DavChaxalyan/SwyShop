import React from "react";
import { useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdHeart } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import styles from "./Cart.module.css";
import {
  addProductInFavorite,
  deleteProductInFavorite,
} from "../../redux/actions/favoriteProductActions";
import {
  decreaseProductCount,
  deleteProductInCart,
  increaseProductCount,
} from "../../redux/actions/cartProductActions";
import { jwtDecode } from "jwt-decode";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleDeleteFromCart = (id) => {
    const token = localStorage.getItem("token");
    dispatch(deleteProductInCart(id, token));
  };

  const addToFavorite = (id) => {
    dispatch(addProductInFavorite(id, localStorage.getItem("token")));
  };

  const deleteToFavorite = (id) => {
    dispatch(deleteProductInFavorite(id, localStorage.getItem("token")));
  };

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

  const handleIncrease = () => {
    const token = localStorage.getItem("token");
    dispatch(increaseProductCount(item._id, token));
  };

  const handleDecrease = () => {
    const token = localStorage.getItem("token");
    dispatch(decreaseProductCount(item._id, token));
  };
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemDetails}>
        <img
          src={
            item.statimage
              ? `http://localhost:5000/${item.statimage}`
              : `http://localhost:5000/${item.image}`
          }
          alt={item.name}
          className={styles.cartItemImage}
        />
        <div>
          <div className={styles.mainItemsCart}>
            <h3>{item.name}</h3>
            <p style={{ color: "gray" }}>{item.color}</p>
            <p style={{ color: "gray" }}>{item.date}</p>
          </div>
          <div className={styles.likeAndDeleteBlock}>
            {!item?.whoInFavorite?.includes(getUserIdFromToken()) ? (
              <FaRegHeart
                onClick={() => addToFavorite(item.id || item._id)}
                style={{ color: "gray", cursor: "pointer", fontSize: "20px" }}
              />
            ) : (
              <IoMdHeart
                onClick={() => deleteToFavorite(item.id || item._id)}
                style={{ color: "red", cursor: "pointer", fontSize: "20px" }}
              />
            )}

            <AiOutlineDelete
              style={{ color: "gray", cursor: "pointer", fontSize: "20px" }}
              onClick={() => handleDeleteFromCart(item.id || item._id)}
            />
          </div>
        </div>
      </div>
      <div className={styles.cartItemQuantity}>
        <button className={styles.buttonDecrement} onClick={handleDecrease} disabled={item?.whoInCart[0]?.count < 2}>
          -
        </button>
        <span>{item?.whoInCart[0]?.count}</span>
        <button className={styles.buttonIncrement} onClick={handleIncrease}>
          +
        </button>
      </div>
      <div className={styles.cartItemPrice}>
        <p>{(item.price * item?.whoInCart[0]?.count).toFixed(1)} AMD</p>
      </div>
    </div>
  );
};

export default CartItem;
