import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import styles from './Favorite.module.css';

const Favorite = () => {
  const favoriteItems = useSelector((state) => state.products.favorites);

  return (
    <div className={styles.favoriteContainer}>
      <h2 className={styles.favoriteTitle}>Favorite Products</h2>
      <div className={styles.productGrid}>
          <ProductCard products={favoriteItems} />
      </div>
    </div>
  );
};

export default Favorite;
