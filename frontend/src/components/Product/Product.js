import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Product.module.css";
import { useEffect } from "react";
import { addProductInCart, getProduct } from "../../redux/actions/addProductActions";
import { jwtDecode } from "jwt-decode";

function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const { id } = useParams();
  const product = products.find((p) => (p._id || p.id) == id);
  
  const handleAddToCart = (id) => {
    const token = localStorage.getItem('token')
    dispatch(addProductInCart(id,token));
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
      <img src={product.statimage ? product.statimage : `http://localhost:5000/${product.image}`} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>Price: {product.price}</p>
        <p>Old Price: {product.oldPrice}</p>
        <p>Category: {product.category}</p>
        <p>Rating: {product.rating}</p>
        <p>Reviews: {product.reviewsCount}</p>
        <p>Color: {product.color}</p>
        <p>Release Date: {product.date}</p>
        {!product?.whoInCart?.includes(getUserIdFromToken()) ? (
          <button
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
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "gray",
              display: "flex",
              alignItems: "center",
              gap: '10px'
            }}
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart />
            In Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;
