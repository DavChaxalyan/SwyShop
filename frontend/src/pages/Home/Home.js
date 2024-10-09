// frontend/src/pages/Home.js
import React, { useEffect } from 'react';
import ImageSlider from '../../components/Sliders/HomePageSlider/ImagesCategoriesSlider';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../redux/actions/productActions';
import { getProductInCart } from '../../redux/actions/cartProductActions';

const Home = () => {
  const products = useSelector((state) => state.products.items); 
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(getProductInCart(token)); 
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
