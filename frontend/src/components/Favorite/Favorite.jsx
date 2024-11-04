import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import NoFavoriteProducts from "../Errors/NoFavoriteProducts"
import styles from "./Favorite.module.css";

const Favorite = () => {
  const favoriteItems = useSelector((state) => state.products.favorites);

  return (
    <div className={styles.favoriteContainer}>
      {favoriteItems && favoriteItems.length > 0 ? (
        <>
          <h2 className={styles.favoriteTitle}>Favorite Products</h2>
          <div className={styles.productGrid}>
            <ProductCard products={favoriteItems} />
          </div>
        </>
      ) : (
        <NoFavoriteProducts />
      )}
    </div>
  );
};

export default Favorite;
