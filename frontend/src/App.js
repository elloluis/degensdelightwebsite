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
import StoreLocator from './pages/StoreLocator';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import StoreManagement from './pages/admin/StoreManagement';
import SubmissionsViewer from './pages/admin/SubmissionsViewer';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './context/AuthContext';

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

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Admin Routes (no age verification needed) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/stores" element={<StoreManagement />} />
            <Route path="/admin/submissions" element={<SubmissionsViewer />} />
            
            {/* Public Routes (with header/footer) */}
            <Route path="*" element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/distributors" element={<Distributors />} />
                  <Route path="/store-locator" element={<StoreLocator />} />
                </Routes>
                <Footer />
              </>
            } />
          </Routes>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;