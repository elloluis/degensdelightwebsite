import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { mockAgeVerification } from '../mock';

const AgeVerification = ({ onVerified }) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerification = async (isOver21) => {
    setIsVerifying(true);
    const result = await mockAgeVerification(isOver21);
    
    if (result.success) {
      localStorage.setItem('ageVerified', 'true');
      onVerified(true);
    } else {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center bg-white">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-red-600 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">21+</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Age Verification Required</h2>
          <p className="text-gray-600">
            You must be 21 years or older to enter this site.
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => handleVerification(true)}
            disabled={isVerifying}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            I am 21 or older
          </Button>
          <Button 
            onClick={() => handleVerification(false)}
            disabled={isVerifying}
            variant="outline"
            className="w-full"
          >
            I am under 21
          </Button>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          By entering this site, you agree to our Terms of Service and Privacy Policy.
        </p>
      </Card>
    </div>
  );
};

export default AgeVerification;