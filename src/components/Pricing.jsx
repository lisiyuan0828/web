import React, { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Starter',
    price: { monthly: 29, annual: 290 },
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 5 team members',
      '10 GB storage',
      'Basic analytics',
      'Email support',
      'Mobile app access',
      'API access'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: { monthly: 79, annual: 790 },
    description: 'For growing businesses that need more',
    features: [
      'Up to 25 team members',
      '100 GB storage',
      'Advanced analytics',
      'Priority support',
      'Mobile app access',
      'API access',
      'Custom integrations',
      'Advanced security'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: { monthly: 199, annual: 1990 },
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited team members',
      'Unlimited storage',
      'Custom analytics',
      '24/7 phone support',
      'Mobile app access',
      'API access',
      'Custom integrations',
      'Advanced security',
      'Dedicated account manager',
      'Custom SLA'
    ],
    popular: false
  }
]

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                !isAnnual
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                isAnnual
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-xl ${
                plan.popular
                  ? 'border-primary-500 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-primary-200'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg">
                    <Sparkles size={16} />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom plan for your organization?
          </p>
          <button className="text-primary-600 hover:text-primary-700 font-semibold">
            Contact Sales →
          </button>
        </div>
      </div>
    </section>
  )
}

export default Pricing
