import React from 'react'
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';

const Favorite = () => {
    const favoriteItems = useSelector((state) => state.products.favorites);
  return (
    <ProductCard products={favoriteItems} />
  )
}

export default Favorite