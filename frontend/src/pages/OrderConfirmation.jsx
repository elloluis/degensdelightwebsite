import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderNumber = location.state?.orderNumber || 'DD123456789';

  React.useEffect(() => {
    if (!location.state?.orderNumber) {
      navigate('/shop');
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your order!
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="text-2xl font-bold text-red-600">{orderNumber}</p>
            </div>

            <div className="space-y-4 text-left mb-8">
              <div className="flex items-start">
                <Mail className="text-red-600 mr-3 mt-1" size={24} />
                <div>
                  <h3 className="font-bold mb-1">Confirmation Email Sent</h3>
                  <p className="text-sm text-gray-600">
                    We've sent a confirmation email with your order details and tracking information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Package className="text-red-600 mr-3 mt-1" size={24} />
                <div>
                  <h3 className="font-bold mb-1">Estimated Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Your order will be delivered within 3-5 business days. You'll receive tracking information soon.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link to="/shop">
                <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </Card>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Questions about your order? Contact us at <a href="mailto:info@degensdelight.com" className="text-red-600 hover:underline">info@degensdelight.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;