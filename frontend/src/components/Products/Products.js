// frontend/src/components/Products.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./Products.module.css";

const Products = () => {
  const products = useSelector((state) => state.products.items);
  console.log(products);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("");

  // Фильтрация товаров
  const filteredProducts = products.filter((product) => {
    const meetsSearchCriteria = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const meetsPriceCriteria =
      product.price >= minPrice && product.price <= maxPrice;
    const meetsCategoryCriteria = selectedCategory
      ? product.category === selectedCategory
      : true;
    const meetsRatingCriteria = product.rating >= minRating;

    return (
      meetsSearchCriteria &&
      meetsPriceCriteria &&
      meetsCategoryCriteria &&
      meetsRatingCriteria
    );
  });

  // Сортировка продуктов
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className={styles.products}>
      <h1>Products</h1>

      {/* Форма фильтрации */}
      <div className={styles.filterForm}>
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div>
          <label>Min Price:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Max Price:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Clothing">Clothing</option>
            <option value="Audio">Audio</option>
          </select>
        </div>

        <div>
          <label>Min Rating:</label>
          <input
            type="number"
            min="0"
            max="5"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          />
        </div>

        <div>
          <label>Sort By:</label>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="">Default</option>
            <option value="priceAsc">Price Low to High</option>
            <option value="priceDesc">Price High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Список продуктов */}
      <ProductCard products={sortedProducts} />
    </div>
  );
};

export default Products;
