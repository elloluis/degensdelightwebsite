import React, { useState } from 'react';
import { Plus, ShoppingCart, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useCart } from '../context/CartContext';
import { products } from '../mock';
import { useToast } from '../hooks/use-toast';

const Shop = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [addedProducts, setAddedProducts] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    
    // Show temporary checkmark
    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [product.id]: false }));
    }, 2000);

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Shop Degen's Delight</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Order online and get premium cranberry vodka RTD delivered to your door
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-shadow">
                {/* Product Image */}
                <div className="relative h-64 bg-gray-50 flex items-center justify-center p-4">
                  {product.category === 'single' ? (
                    <div className="w-32 h-48 bg-gradient-to-b from-red-600 via-red-700 to-red-800 rounded-lg shadow-xl relative">
                      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg"></div>
                      <div className="absolute top-8 left-2 right-2 bg-white rounded p-2 text-center">
                        <p className="text-xs font-bold">DEGEN'S</p>
                        <p className="text-xs font-bold text-red-600">DELIGHT</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-48 h-56 bg-white rounded-lg shadow-xl border-4 border-gray-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 p-2 text-white text-center">
                        <p className="text-xs font-bold">NON-CARBONATED</p>
                      </div>
                      <div className="p-4 flex justify-center items-center">
                        <div className="text-center">
                          <p className="text-3xl font-bold">6</p>
                          <p className="text-xs">CANS</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 p-2 text-white text-center">
                        <p className="text-xs font-bold">100% REAL JUICE</p>
                      </div>
                    </div>
                  )}
                  {product.specs.savings && (
                    <Badge className="absolute top-2 right-2 bg-green-600">
                      {product.specs.savings}
                    </Badge>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  {/* Specs */}
                  <div className="space-y-1 mb-4 text-sm">
                    {Object.entries(product.specs).map(([key, value]) => (
                      key !== 'savings' && (
                        <div key={key} className="flex justify-between text-gray-600">
                          <span className="capitalize">{key}:</span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      )
                    ))}
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-2xl font-bold text-red-600">${product.price.toFixed(2)}</p>
                      {product.stock < 10 && (
                        <p className="text-xs text-orange-500">Only {product.stock} left!</p>
                      )}
                    </div>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={product.stock === 0}
                    >
                      {addedProducts[product.id] ? (
                        <>
                          <Check size={18} className="mr-2" />
                          Added!
                        </>
                      ) : (
                        <>
                          <Plus size={18} className="mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Order Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <ShoppingCart className="mx-auto mb-4 text-red-600" size={40} />
                <h3 className="font-bold mb-2">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">21+</span>
                </div>
                <h3 className="font-bold mb-2">Age Verification</h3>
                <p className="text-sm text-gray-600">Required at delivery</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <Check className="text-red-600" size={24} />
                </div>
                <h3 className="font-bold mb-2">Secure Checkout</h3>
                <p className="text-sm text-gray-600">Safe & encrypted payment</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;