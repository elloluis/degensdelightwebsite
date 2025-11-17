import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { productSpecs } from '../mock';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center pt-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1653387253215-bb98607b4c53)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Drink <span className="text-red-500">Degen's Delight</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Miami-based premium cranberry vodka RTD crafted for the modern drinker
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/product">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                  Explore Product
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/distributors">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8">
                  For Distributors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Not your typical hard seltzer. This is a real cocktail in a can.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productSpecs.features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                <CheckCircle className="text-red-600 mb-4" size={40} />
                <h3 className="text-xl font-bold mb-2">{feature}</h3>
                <p className="text-gray-600">
                  {index === 0 && "Crafted with the finest vodka for authentic cocktail taste"}
                  {index === 1 && "No artificial flavors. Just pure cranberry juice."}
                  {index === 2 && "No bubbles, no bloat. Just smooth refreshment."}
                  {index === 3 && "Only 170 calories per can - guilt-free indulgence."}
                  {index === 4 && "Fully compliant and ready for distribution."}
                  {index === 5 && "Premium packaging in a convenient format."}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1691198913445-d7032ec7f2dc" 
                alt="Degen's Delight Cocktail"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Bar-Quality <span className="text-red-600">Cocktail</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We've perfected the classic cranberry vodka cocktail and put it in a can. 
                No bartender needed, no complicated recipes, just crack it open and enjoy.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Sparkles className="text-red-600 mr-3 mt-1" size={24} />
                  <div>
                    <strong className="block">Non-Carbonated Formula</strong>
                    <span className="text-gray-600">Still, not sparkling - for a true cocktail experience</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="text-red-600 mr-3 mt-1" size={24} />
                  <div>
                    <strong className="block">5% ABV</strong>
                    <span className="text-gray-600">Perfect strength for a satisfying drink</span>
                  </div>
                </li>
              </ul>
              <Link to="/product">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience the Delight?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a distributor looking for the next big thing or a consumer ready to try something new
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8">
                Get In Touch
              </Button>
            </Link>
            <Link to="/distributors">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8">
                Distribution Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;