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
import { getProduct } from "./redux/actions/productActions";
import { getProductInCart } from "./redux/actions/cartProductActions";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import EmailVerification from "./components/auth/EmailVerification/EmailVerification";
import ForgotPassword from "./components/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword/ResetPassword";
import EditProductPage from "./pages/EditProductPage/EditProductPage";
import MyProductsPage from "./pages/MyProductsPage/MyProductsPage";
import NotFoundPage from "./components/Errors/NotFoundPage";
import { getUserIdFromToken } from "./Utils/utils";
import { getUser } from "./redux/actions/userActions";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      await dispatch(getProductInCart(token));
      await dispatch(getProduct());
      await dispatch(getUser(getUserIdFromToken(), token));
    }
    fetchData()
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
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/edit-product/:id" element={<EditProductPage />} />
              <Route path="/my-products" element={<MyProductsPage />} />
              <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
