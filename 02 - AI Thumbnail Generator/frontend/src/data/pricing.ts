import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
  {
    name: "Basic",
    price: 29,
    period: "month",
    features: [
      "50 AI thumbnails/mo",
      "Basic Templates",
      "Standard Resolution",
      "No watermark",
      "Email support",
    ],
    mostPopular: false,
  },
  {
    name: "Pro",
    price: 79,
    period: "month",
    features: [
      "Unlimited AI thumbnails",
      "Premium Templates",
      "4k Resolution",
      "Priority Support",
      "Custom Fonts",
      "Brand Kit Analysis",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    period: "month",
    features: [
      "API Access",
      "Team Collaboration",
      "Custom Branding",
      "Dedicated Account Manager",
      "24/7 Support",
      "Custom Integration",
    ],
    mostPopular: false,
  },
];
