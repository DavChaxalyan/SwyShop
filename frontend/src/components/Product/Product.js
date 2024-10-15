import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Product.module.css";
import { useEffect } from "react";
import { getProduct } from "../../redux/actions/productActions";
import { addProductInCart } from "../../redux/actions/cartProductActions";
import { jwtDecode } from "jwt-decode";
import { Button,} from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";

function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const { id } = useParams();
  const product = products.find((p) => (p._id || p.id) == id);

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem('token')
    if (token) {
      await dispatch(addProductInCart(id, token));
      return 
     }
     navigate('/login')
     setTimeout(() => {
       alert('You need to log in or register to add to cart.')
     }, 500)
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.productDetails}>
      <img src={product.statimage ? `http://localhost:5000/${product.statimage}` : `http://localhost:5000/${product.image}`} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>Category: {product.category}</p>
        <div className={styles.ratingBlock}>
        <FaStar style={{ fill: "#ff7d00" }} className={styles.star} />
        <p>Rating: {product.rating}</p>
        </div>
        <p>Reviews: {product.reviewsCount}</p>
        <p>Color: {product.color}</p>
        <p>Release Date: {product.date}</p>
      </div>
      <div className={styles.cardBlock}>
          <div className={styles.priceBlock}>
              <h2>Price: {product.price}</h2>
            <del>
            <p>Old Price: {product.oldPrice}</p>
            </del>
          </div>

          {!product?.whoInCart?.includes(getUserIdFromToken()) ? (
            <Button
            style={{
              display: "flex",
                alignItems: "center",
                gap: '10px'
              }}
              onClick={() =>
                handleAddToCart((product._id || product.id))
              }
              >
              <FaShoppingCart />
              Add to Cart
            </Button>
          ) : (
            <Button
            style={{
              backgroundColor: "gray",
              border:'none',
              display: "flex",
              alignItems: "center",
              gap: '10px'
            }}
            onClick={() => navigate("/cart")}
            >
              <FaShoppingCart />
              In Cart
            </Button>
          )}
          <div className={styles.ratingShop}>
          <BsShop />
            <h5>mobile center</h5>
          <FaStar style={{ fill: "#ff7d00" }} className={styles.star} />
          <p>4.7</p>
          </div>
      </div>
    </div>
  );
}

export default Product;
