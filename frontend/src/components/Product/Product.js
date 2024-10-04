import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Product.css";

function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>Price: {product.price}</p>
        <p>Old Price: {product.oldPrice}</p>
        <p>Category: {product.category}</p>
        <p>Rating: {product.rating}</p>
        <p>Reviews: {product.reviewsCount}</p>
        <p>Color: {product.color}</p>
        <p>Release Date: {product.date}</p>
        {!product.isInCart ? (
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: '10px'
            }}
            onClick={() =>
              dispatch({ type: "ADD_TO_CART", payload: product.id })
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
