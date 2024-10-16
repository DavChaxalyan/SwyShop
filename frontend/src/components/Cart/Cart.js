import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItems";
import CartSummary from "./CartSummary";
import CheckoutSection from "./CheckoutSection";
import styles from "./Cart.module.css";
import EmptyCart from "./EmptyCart";
import { getProductInCart } from "../../redux/actions/cartProductActions";
import { getUserIdFromToken } from "../../Utils/utils";

const Cart = () => {
  const cartItems = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchedProducts = async () => {
      await dispatch(getProductInCart(token));
    };

    fetchedProducts();
  }, [dispatch]);
  return (
    <div className={styles.cartContainer}>
      {cartItems?.length > 0 ? (
        <>
          <div className={styles.cartItems}>
            <div className={styles.titleCard}>
              <h3>Cart</h3>
              <span>
                {cartItems.reduce((total, item) => {
                  const userInCart = item.whoInCart.find(
                    (user) => user.userId.toString() === getUserIdFromToken()
                  );
                  return total + (userInCart ? userInCart.count : 0);
                }, 0)}{" "}
                product
              </span>
            </div>
            {cartItems?.map((item) => (
              <CartItem key={item.id || item._id} item={item} />
            ))}
          </div>
          <div className={styles.cartSummarySection}>
            <CartSummary />
            <CheckoutSection />
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
