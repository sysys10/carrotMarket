import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";
import ScrollToTop from "./utils/scrollTop";
import NearbyStores from "./pages/NearbyStores";

function App() {
  return (
    <BrowserRouter>
      
      <ScrollToTop/>
      <AuthProvider>
        <div className="flex flex-col bg-gray-100">
          <Navbar />
          <main className="flex-grow min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/nearby-stores" element={<NearbyStores/>} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:roomId" element={<Chat />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
