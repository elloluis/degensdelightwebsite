import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { distributorBenefits } from '../mock';
import { TrendingUp, Clock, DollarSign, Sparkles, Users, CheckCircle, Send } from 'lucide-react';
import ProductCarton from '../components/ProductCarton';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const iconMap = {
  TrendingUp: TrendingUp,
  Clock: Clock,
  DollarSign: DollarSign,
  Sparkles: Sparkles,
  Users: Users,
  CheckCircle: CheckCircle
};

const Distributors = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    location: '',
    currentBrands: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      businessType: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/distributors`, formData);
      
      toast({
        title: "Inquiry Submitted!",
        description: "Thank you for your interest! Our distribution team will contact you within 24 hours.",
      });

      // Reset form
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        businessType: '',
        location: '',
        currentBrands: '',
        message: ''
      });
    } catch (error) {
      console.error('Distributor form error:', error);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section 
        className="relative py-32"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1653387253215-bb98607b4c53)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Partner With <span className="text-red-500">Degen's Delight</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Join the RTD revolution. Capitalize on the fastest-growing segment in the beverage alcohol market.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Partner With Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Strategic positioning, operational excellence, and proven market demand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {distributorBenefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon];
              return (
                <Card key={index} className="p-6 hover:shadow-xl transition-shadow border-2 border-gray-100">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="text-red-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">The Market Opportunity</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-red-600 mb-2">$47.8B Market Share</h3>
                    <p className="text-gray-600">
                      Spirits-based RTDs lead the category globally with strong consumer preference for premium options.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-red-600 mb-2">40.3% YoY Growth</h3>
                    <p className="text-gray-600">
                      RTD sales in on-premise channels are surging, with bars and nightclubs leading adoption.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-red-600 mb-2">55% Frequent Consumers</h3>
                    <p className="text-gray-600">
                      Millennials and Gen Z drive high-velocity consumption, creating sustainable demand.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="/carton-final.png" 
                  alt="Degen's Delight 6-Pack Carton"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution Inquiry Form */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Become a Distributor</h2>
              <p className="text-xl text-gray-400">
                Fill out the form below and our distribution team will contact you within 24 hours
              </p>
            </div>

            <Card className="p-8 bg-gray-900 border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName" className="text-white">Company Name *</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Your Company"
                      className="mt-2 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactName" className="text-white">Contact Name *</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="mt-2 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      className="mt-2 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(555) 123-4567"
                      className="mt-2 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="businessType" className="text-white">Business Type *</Label>
                    <Select onValueChange={handleSelectChange} value={formData.businessType}>
                      <SelectTrigger className="mt-2 bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="distributor">Distributor</SelectItem>
                        <SelectItem value="bar">Bar/Nightclub</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="retailer">Retailer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-white">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="City, State"
                      className="mt-2 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="currentBrands" className="text-white">Current Brands You Distribute</Label>
                  <Input
                    id="currentBrands"
                    name="currentBrands"
                    value={formData.currentBrands}
                    onChange={handleChange}
                    placeholder="e.g., High Noon, White Claw, etc."
                    className="mt-2 bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">Additional Information</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your distribution network, target markets, or any questions you have..."
                    rows={5}
                    className="mt-2 bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  size="lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  <Send className="ml-2" size={18} />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Distributors;