import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Access to basic tasks',
        'Earn up to 500 coins/day',
        'Email support',
        'Basic analytics',
        'Mobile app access'
      ],
      highlighted: false,
      buttonText: 'Get Started'
    },
    {
      name: 'Professional',
      price: '$9.99',
      period: '/month',
      description: 'Best for serious earners',
      features: [
        'Access to all tasks',
        'Unlimited earnings',
        'Priority support',
        'Advanced analytics',
        'Mobile app access',
        'Task recommendations',
        'Faster payouts'
      ],
      highlighted: true,
      buttonText: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For teams and businesses',
      features: [
        'Custom task creation',
        'Team collaboration',
        'Dedicated support',
        'Custom analytics',
        'API access',
        'White-label options',
        'Custom integrations'
      ],
      highlighted: false,
      buttonText: 'Contact Sales'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the plan that works best for you. Start free and upgrade as you grow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.highlighted 
                  ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 scale-105' 
                  : 'hover:-translate-y-1'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 dark:text-gray-300 ml-1">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {plan.description}
                  </p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300">
            All plans include 30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
