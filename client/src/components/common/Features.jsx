const Features = () => {
  const features = [
    {
      icon: '💰',
      title: 'Easy Earnings',
      description: 'Complete simple tasks and earn coins instantly. No complex requirements.',
    },
    {
      icon: '⚡',
      title: 'Quick Payouts',
      description: 'Withdraw your earnings easily. Minimum 200 coins required for withdrawal.',
    },
    {
      icon: '🎯',
      title: 'Variety of Tasks',
      description: 'Browse through hundreds of tasks in different categories.',
    },
    {
      icon: '🔒',
      title: 'Secure Platform',
      description: 'Your data and earnings are protected with industry-standard security.',
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Work from anywhere, anytime. Our platform works on all devices.',
    },
    {
      icon: '⭐',
      title: 'Fair System',
      description: 'Transparent approval process. Get rewarded for quality work.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose MicroEarn?
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to start earning today
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
