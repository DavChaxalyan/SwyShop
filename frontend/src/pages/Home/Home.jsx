import React, { useEffect } from 'react';
import ImageSlider from '../../components/Sliders/HomePageSlider/ImagesCategoriesSlider';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, getProduct } from '../../redux/actions/productActions';
import { getProductInCart } from '../../redux/actions/cartProductActions';

const Home = () => {
  const products = useSelector((state) => state.products.items); 
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchedProducts = async () => {
      await dispatch(fetchProducts()); 
      await dispatch(getProduct()); 
      await dispatch(getProductInCart(token)); 
    }

    fetchedProducts()
  }, [dispatch]);

  return (
    <div>
      <ImageSlider />
      <ProductCard products={products}/>
    </div>
  )
};

export default Home;
