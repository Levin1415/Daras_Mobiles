import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import SpecialOffers from './pages/SpecialOffers';
import Models from './pages/Models';
import NewArrivals from './pages/NewArrivals';
import Checkout from './pages/Checkout';

const Profile = () => <div>Profile Page</div>;

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/categories" element={<Categories />} />
                            <Route path="/categories/:category" element={<CategoryProducts />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/special-offers" element={<SpecialOffers />} />
                            <Route path="/models" element={<Models />} />
                            <Route path="/new-arrivals" element={<NewArrivals />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        </Routes>
                    </Layout>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
