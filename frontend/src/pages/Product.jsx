import React from 'react';
import { Card } from '../components/ui/card';
import ProductCan from '../components/ProductCan';
import ProductCarton from '../components/ProductCarton';
import ProductLogo from '../components/ProductLogo';
import { productSpecs } from '../mock';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { faqs } from '../mock';
import { CheckCircle } from 'lucide-react';

const Product = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Product Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <ProductLogo size="lg" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {productSpecs.name}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {productSpecs.type}
              </p>
              <div className="bg-red-600 p-6 rounded-lg inline-block">
                <p className="text-4xl font-bold">{productSpecs.abv}</p>
                <p className="text-sm">Alcohol by Volume</p>
              </div>
            </div>
            <div>
              <img 
                src="/can-transparent.png" 
                alt="Degen's Delight Cranberry Vodka RTD Can - 12 FL OZ"
                className="w-full max-w-md mx-auto h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6-Pack Carton Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Available in Convenient 6-Packs</h2>
            <p className="text-xl text-gray-600">Premium packaging for premium quality</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <img 
              src="/carton-image.jpg" 
              alt="Degen's Delight 6-Pack Carton - Cranberry Vodka RTD"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Simple, Quality Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productSpecs.ingredients.map((ingredient, index) => (
                <div key={index} className="bg-gray-900 p-6 rounded-lg">
                  <CheckCircle className="text-red-600 mx-auto mb-4" size={48} />
                  <p className="text-xl font-bold">{ingredient}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Makes Us Special</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {productSpecs.features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow border-2 border-gray-200">
                <CheckCircle className="text-red-600 mb-3" size={32} />
                <h3 className="text-lg font-bold">{feature}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:text-red-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;