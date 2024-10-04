import React from "react";
import { useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <img src={item.image} alt={item.name} className="cart-item-image" />
        <div>
          <div className="main-items-cart">
            <h3>{item.name}</h3>
            <p style={{ color: "gray" }}>{item.color}</p>
            <p style={{ color: "gray" }}>{item.date}</p>
          </div>
          <div className="like-and-delete-block">
            <FaRegHeart
              style={{ color: "gray", cursor: "pointer", fontSize: "20px" }}
            />
            <AiOutlineDelete
              style={{ color: "gray", cursor: "pointer", fontSize: "20px" }}
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
              }
            />
          </div>
        </div>
      </div>
      <div className="cart-item-quantity">
        <button
          className="button-decrement"
          onClick={() =>
            dispatch({ type: "DECREMENT_QUANTITY", payload: item.id })
          }
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          className="button-increment"
          onClick={() =>
            dispatch({ type: "INCREMENT_QUANTITY", payload: item.id })
          }
        >
          +
        </button>
      </div>
      <div className="cart-item-price">
        <p>{(item.price * item.quantity).toFixed(1)} AMD</p>
      </div>
    </div>
  );
};

export default CartItem;
