import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Product.module.css";
import { useEffect } from "react";
import { getProduct } from "../../redux/actions/productActions";
import { addProductInCart } from "../../redux/actions/cartProductActions";
import { Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { formatCurrency, getUserIdFromToken, priceFix } from "../../Utils/utils";
import { useTranslation } from "react-i18next";

function Product() {
  const { t } = useTranslation();
  const { currency, exchangeRates } = useSelector((state) => state.currency);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const { id } = useParams();
  const product = products.find((p) => (p._id || p.id) === id);

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      await dispatch(addProductInCart(id, token));
      return;
    }
    navigate("/login");
    setTimeout(() => {
      alert("You need to log in or register to add to cart.");
    }, 500);
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.productDetails}>
      <img
        src={
          product.statimage
            ? `https://swyshop.onrender.com/${product.statimage}`
            : `https://swyshop.onrender.com/${product.image}`
        }
        alt={product.name}
        className={styles.productDetailsImg}
      />
      <div className={styles.productDetailsMain}>
        <div className={styles.productDetailsTitles}>
          <h2>{product.name}</h2>
          <p>
            {t("product-page-lb1")}: {product.category}
          </p>
          <div className={styles.ratingBlock}>
            <FaStar style={{ fill: "#ff7d00" }} className={styles.star} />
            <p>
              {t("product-page-lb2")}: {product.rating}
            </p>
          </div>
          <p>
            {t("product-page-lb3")}: {product.reviewsCount}
          </p>
          <p>
            {t("product-page-lb4")}: {product.color}
          </p>
          <p>
            {t("product-page-lb5")}: {product.date}
          </p>
        </div>
        <div className={styles.cardBlock}>
          <div className={styles.priceBlock}>
            <h2>
              {t("product-page-lb6")}: {formatCurrency(priceFix(currency, product.price, exchangeRates), currency)}
            </h2>
            {product.oldPrice && (
              <del>
                <p>
                  {t("product-page-lb7")}: {formatCurrency(priceFix(currency, product.oldPrice, exchangeRates), currency)}
                </p>
              </del>
            )}
          </div>
          {getUserIdFromToken() !== product?.user ? (
            !product?.whoInCart.some(
              (user) => user.userId.toString() === getUserIdFromToken()
            ) ? (
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onClick={() => handleAddToCart(product._id || product.id)}
              >
                <FaShoppingCart />
                {t("product-page-button-add-cart")}
              </Button>
            ) : (
              <Button
                style={{
                  backgroundColor: "gray",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onClick={() => navigate("/cart")}
              >
                <FaShoppingCart />
                {t("product-page-button-in-cart")}
              </Button>
            )
          ) : (
            <span className={styles.productMessage}>
              {t("modal-form-input-your-product")}
            </span>
          )}
          <div className={styles.ratingShop}>
            <BsShop />
            <h5>mobile center</h5>
            <FaStar style={{ fill: "#ff7d00" }} className={styles.star} />
            <p>4.7</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
