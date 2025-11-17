import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AgeVerification from './components/AgeVerification';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Contact from './pages/Contact';
import Distributors from './pages/Distributors';
import { Toaster } from './components/ui/sonner';

function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already verified their age
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsAgeVerified(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isAgeVerified) {
    return <AgeVerification onVerified={setIsAgeVerified} />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <Header />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/distributors" element={<Distributors />} />
          </Routes>
          <Footer />
          <Toaster />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;