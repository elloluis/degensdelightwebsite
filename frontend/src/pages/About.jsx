import React from 'react';
import { Card } from '../components/ui/card';
import ProductLogo from '../components/ProductLogo';
import { brandStory, founderBio, brandInfo } from '../mock';
import { Sparkles, Droplets, Award, MapPin, User } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <ProductLogo size="xl" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-gray-600">
              A perfect blend of history, tradition, and modern craftsmanship
            </p>
          </div>
        </div>
      </section>

      {/* Cranberry History */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1627744523295-e307e79adeae" 
                alt="Fresh Cranberries"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div>
              <div className="flex items-center mb-4">
                <Droplets className="text-red-600 mr-3" size={40} />
                <h2 className="text-4xl font-bold">The Cranberry</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {brandStory.cranberryHistory}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vodka History */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <Sparkles className="text-red-600 mr-3" size={40} />
                <h2 className="text-4xl font-bold">The Vodka</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {brandStory.vodkaHistory}
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1669698273769-24f6fed78f43" 
                alt="Premium Vodka Cocktail"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Degen's Delight Story */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Award className="text-red-600 mr-3" size={40} />
                <h2 className="text-4xl font-bold">Degen's Delight</h2>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                {brandStory.productDescription}
              </p>
            </div>

            {/* Product Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <img 
                src="https://images.unsplash.com/photo-1631793562382-6620fd6ebfbe" 
                alt="Fresh Cranberries in Basket"
                className="rounded-lg shadow-xl w-full h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1708441798225-092cf1bb86f7" 
                alt="Abundant Cranberries"
                className="rounded-lg shadow-xl w-full h-64 object-cover"
              />
              <img 
                src="https://images.pexels.com/photos/2373532/pexels-photo-2373532.jpeg" 
                alt="Cranberry Cocktail"
                className="rounded-lg shadow-xl w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Commitment</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quality, authenticity, and responsibility in every can
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-red-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the finest ingredients - premium vodka and 100% real cranberry juice. No compromises.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="text-red-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Authentic Taste</h3>
              <p className="text-gray-600">
                Non-carbonated for a true cocktail experience. This is how a cranberry vodka should taste.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-red-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Responsible</h3>
              <p className="text-gray-600">
                TTB approved, fully compliant, and committed to responsible drinking practices.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Bio Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <User className="text-red-600 mr-3" size={48} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet the Founder</h2>
              <div className="flex items-center justify-center space-x-4 text-xl text-gray-400">
                <span>{founderBio.name}</span>
                <span>•</span>
                <span>{founderBio.title}</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 md:p-12 space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="text-red-600" size={24} />
                <p className="text-lg">
                  <span className="font-semibold">{founderBio.location}</span> • <span className="text-gray-400">{founderBio.heritage} Heritage</span>
                </p>
              </div>

              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  {founderBio.story}
                </p>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">The Inception of Degen's Delight</h3>
                  <p className="text-lg">
                    {founderBio.inception}
                  </p>
                  <p className="text-lg mt-4">
                    {founderBio.mission}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Strategic Growth and Market Entry</h3>
                  <p className="text-lg">
                    {founderBio.vision}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-red-500">19</p>
                    <p className="text-sm text-gray-400">Age When Founded</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-red-500">2026</p>
                    <p className="text-sm text-gray-400">Florida Launch</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-red-500">Miami</p>
                    <p className="text-sm text-gray-400">Based In</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;