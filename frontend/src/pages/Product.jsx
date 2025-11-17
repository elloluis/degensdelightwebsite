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
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-600 p-4 rounded-lg">
                  <p className="text-4xl font-bold">{productSpecs.abv}</p>
                  <p className="text-sm">Alcohol by Volume</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-4xl font-bold">{productSpecs.calories}</p>
                  <p className="text-sm">Calories per Can</p>
                </div>
              </div>
            </div>
            <div>
              <ProductCan />
            </div>
          </div>
        </div>
      </section>

      {/* Nutritional Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Nutritional Facts</h2>
            <Card className="p-8 border-4 border-black">
              <div className="border-b-8 border-black pb-2 mb-4">
                <h3 className="text-3xl font-bold">Serving Facts</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-semibold">Serving Size</span>
                  <span>{productSpecs.servingSize}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-semibold">Servings per Container</span>
                  <span>{productSpecs.servingsPerContainer}</span>
                </div>
                <div className="border-t-4 border-black pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Amount Per Serving</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-300 pb-2">
                    <span className="font-bold text-lg">Calories</span>
                    <span className="font-bold text-lg">{productSpecs.calories}</span>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Alcohol by Volume</span>
                    <span className="font-bold">{productSpecs.abv}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Total Carbohydrates</span>
                    <span className="font-bold">{productSpecs.carbs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Total Fat</span>
                    <span className="font-bold">{productSpecs.fat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Protein</span>
                    <span className="font-bold">{productSpecs.protein}</span>
                  </div>
                </div>
              </div>
            </Card>
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
          <ProductCarton />
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