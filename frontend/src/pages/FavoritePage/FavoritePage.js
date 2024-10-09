import React, { useEffect } from "react";
import Favorite from "../../components/Favorite/Favorite";
import { useDispatch } from "react-redux";
import { getProductInFavorite } from "../../redux/actions/favoriteProductActions";

const FavoritePage = () => {
    const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(getProductInFavorite(token)); 
  }, [dispatch]);
  return <Favorite />;
};

export default FavoritePage;
