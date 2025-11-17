// Mock data for Degen's Delight website

export const brandInfo = {
  name: "Degen's Delight",
  tagline: "Where Tart Meets Smooth",
  description: "A non-carbonated cranberry vodka RTD that perfectly balances bold cranberry richness with the crisp kick of premium vodka.",
  email: "info@degensdelight.com",
  phone: "786-449-0930",
  manufacturer: "Maumee Bay Brewing"
};

export const productSpecs = {
  name: "Degen's Delight Cranberry",
  type: "Non-Carbonated RTD Cocktail",
  abv: "5%",
  servingSize: "12 fl oz (355 ml)",
  servingsPerContainer: 1,
  packageSize: "6-pack",
  calories: 170,
  carbs: "17g",
  fat: "0g",
  protein: "0g",
  ingredients: ["Premium Vodka", "100% Real Cranberry Juice", "Natural Flavors"],
  features: [
    "Made with Premium Vodka",
    "100% Real Juice",
    "Non-Carbonated",
    "Low in Calories",
    "TTB Approved",
    "12oz Sleek Can"
  ]
};

export const brandStory = {
  cranberryHistory: "Cranberries, native to the wild landscapes of North America, were cherished by Indigenous peoples long before European settlers arrived. Treasured for their rich flavor, healing properties, and vibrant hues, these tantalizing berries have been cultivated in New England since the early 19th century. Today, cranberries and their tart crimson juice are essential ingredients for the discerning cocktail connoisseur.",
  vodkaHistory: "Vodka, a spirit born in the heart of Eastern Europe, has tantalized taste buds for centuries, with Russia and Poland both laying claim to its origins in the 8th or 9th century. What began as a healing elixir evolved into a refined indulgence, becoming the drink of choice by the 17th century as distillation techniques perfected its smooth, intoxicating allure.",
  productDescription: "Degen's Delight: a non-carbonated beverage that perfectly balances tart and smooth - a refreshing cocktail crafted with the bold richness of cranberry juice and the crisp kick of delicious vodka. Each vibrant, tantalizing sip is both refreshing and indulgent. Enjoy Degen's Delight responsibly: we hope your first sip to the last sparks bliss!"
};

export const distributorBenefits = [
  {
    title: "High Velocity On-Premise",
    description: "Perfect for bars and nightclubs with proven high sales velocity in the on-premise sector.",
    icon: "TrendingUp"
  },
  {
    title: "Operational Efficiency",
    description: "Speed of service, consistency, and waste reduction. Open, pour, garnish - that simple.",
    icon: "Clock"
  },
  {
    title: "Premium Margins",
    description: "Higher ABV positioning delivers better margins while maintaining competitive pricing.",
    icon: "DollarSign"
  },
  {
    title: "Market Differentiation",
    description: "Non-carbonated, still cocktail experience sets us apart from saturated hard seltzer market.",
    icon: "Sparkles"
  },
  {
    title: "Target Demographics",
    description: "Millennials and Gen Z who value high-quality ingredients and variety.",
    icon: "Users"
  },
  {
    title: "TTB Compliant",
    description: "Fully approved and ready for distribution across all markets.",
    icon: "CheckCircle"
  }
];

export const testimonials = [
  {
    quote: "Finally, a cranberry vodka that doesn't leave you bloated. The still profile is a game-changer.",
    author: "Sarah M.",
    role: "Bar Manager, NYC"
  },
  {
    quote: "Our customers love it. Easy to serve, consistent quality, and the higher ABV means better margins for us.",
    author: "Mike T.",
    role: "Nightclub Owner, Miami"
  },
  {
    quote: "This is what a real cranberry vodka should taste like. No bubbles, just pure flavor.",
    author: "Jessica L.",
    role: "Consumer"
  }
];

export const faqs = [
  {
    question: "What makes Degen's Delight different from hard seltzers?",
    answer: "Unlike carbonated hard seltzers, Degen's Delight is a non-carbonated, still cocktail with a higher ABV (5%) and made with 100% real cranberry juice. It delivers a true bar-quality cocktail experience without the bloat."
  },
  {
    question: "What's the calorie count?",
    answer: "Each 12 fl oz can contains 170 calories, which is significantly lower than traditional mixed cocktails (300-500 calories) while still delivering authentic cocktail strength."
  },
  {
    question: "Where can I buy Degen's Delight?",
    answer: "We're currently available in select bars, nightclubs, and retail locations. Use our contact form to find the nearest location or inquire about distribution."
  },
  {
    question: "Is it really made with real juice?",
    answer: "Absolutely! We use 100% real cranberry juice combined with premium vodka. No artificial flavors or colors."
  },
  {
    question: "What's the serving size?",
    answer: "Each can is 12 fl oz (355 ml) - the perfect single serving for a complete cocktail experience."
  },
  {
    question: "How should I serve it?",
    answer: "Serve chilled over ice with a lime wedge garnish for the perfect presentation. It's that simple!"
  }
];

// Mock form submission handlers
export const mockContactSubmit = (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      resolve({ success: true, message: 'Thank you! We\'ll be in touch soon.' });
    }, 1000);
  });
};

export const mockDistributorSubmit = (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Distributor inquiry submitted:', formData);
      resolve({ success: true, message: 'Thank you for your interest! Our distribution team will contact you within 24 hours.' });
    }, 1000);
  });
};

export const mockAgeVerification = (isOver21) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Age verification:', isOver21);
      resolve({ success: isOver21 });
    }, 500);
  });
};