// frontend/src/pages/Home.js
import React, { useEffect } from 'react';
import ImageSlider from '../../components/Sliders/HomePageSlider/ImagesCategoriesSlider';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../redux/actions/addProductActions';

const Home = () => {
  const products = useSelector((state) => state.products.items); 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProduct()); 
  }, [dispatch]);

  return (
    <div>
      <ImageSlider />
      <ProductCard products={products}/>
    </div>
  )
};

export default Home;
