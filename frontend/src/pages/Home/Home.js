// frontend/src/pages/Home.js
import React from 'react';
import ImageSlider from '../../components/Sliders/HomePageSlider/ImagesCategoriesSlider';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useSelector } from 'react-redux';

const Home = () => {
  const products = useSelector((state) => state.products.items); 

  return (
    <div>
      <ImageSlider />
      <ProductCard products={products}/>
    </div>
  )
};

export default Home;
