import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import NoFavoriteProducts from "../Errors/NoFavoriteProducts"
import styles from "./Favorite.module.css";
import { useTranslation } from "react-i18next";

const Favorite = () => {
  const { t } = useTranslation();
  const favoriteItems = useSelector((state) => state.products.favorites);

  return (
    <div className={styles.favoriteContainer}>
      {favoriteItems && favoriteItems.length > 0 ? (
        <>
          <h2 className={styles.favoriteTitle}>{t("favorite-page-title")}</h2>
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
