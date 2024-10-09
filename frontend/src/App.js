import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ProductsPage from "./pages/Products/Products";
import ContactPage from "./pages/Contact/Contact";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import ProductPage from "./pages/Product/ProductPage";
import AddProductPage from "./pages/AddProductPage/AddProductPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import { useDispatch } from "react-redux";
import { getProductInCart } from "./redux/actions/addProductActions";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(getProductInCart(token)); 
  }, [dispatch]);
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
