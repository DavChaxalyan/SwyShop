import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./Products.module.css";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
  const products = useSelector((state) => state.products.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("");

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

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div>
      <div className={styles.bgImage}>
        <div className="text-center w-100">
          <div className={styles.mask}>
            <div className="d-flex justify-content-center align-items-center h-100 py-3">
              <div className="text-white p-3">
                <h1>{t("products-page-title")}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.productNameInputBlock}>
          <input
            type="text"
            placeholder={`${t("products-page-inp1")}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.productNameInput}
          />
        </div>
        <div className={styles.filterForm}>
          <div className={styles.formBlock}>
            <label>{t("products-page-lb1")}:</label>
            <input
              type="number"
              value={minPrice}
              className={styles.inputs}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className={styles.formBlock}>
            <label>{t("products-page-lb2")}:</label>
            <input
              type="number"
              value={maxPrice}
              className={styles.inputs}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className={styles.formBlock}>
            <label>{t("products-page-lb3")}:</label>
            <Form.Select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
              className={styles.formSelect}
            >
              <option value="">{t("products-page-lb3-1")}</option>
              <option value="Electronics">{t("products-page-lb3-2")}</option>
              <option value="Gadgets">{t("products-page-lb3-3")}</option>
              <option value="Clothing">{t("products-page-lb3-4")}</option>
              <option value="Audio">{t("products-page-lb3-5")}</option>
            </Form.Select>
          </div>

          <div className={styles.formBlock}>
            <label>{t("products-page-lb4")}:</label>
            <input
              type="number"
              min="0"
              max="5"
              value={minRating}
              className={styles.inputs}
              onChange={(e) => setMinRating(e.target.value)}
            />
          </div>

          <div className={styles.formBlock}>
            <label>{t("products-page-lb5")}:</label>
            <Form.Select
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
              className={styles.formSelect}
            >
              <option value="">{t("products-page-lb5-1")}</option>
              <option value="priceAsc">{t("products-page-lb5-2")}</option>
              <option value="priceDesc">{t("products-page-lb5-3")}</option>
              <option value="rating">{t("products-page-lb5-4")}</option>
            </Form.Select>
          </div>
        </div>

        <ProductCard products={sortedProducts} />
      </div>
    </div>
  );
};

export default Products;
