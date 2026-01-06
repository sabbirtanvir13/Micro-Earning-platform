const Stats = () => {
  const stats = [
    { label: 'Active Workers', value: '25,000+', icon: '👥' },
    { label: 'Tasks Completed', value: '1.2M+', icon: '✅' },
    { label: 'Total Payout', value: '$850k+', icon: '💰' },
    { label: 'Countries', value: '120+', icon: '🌍' },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-center lg:justify-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-xl text-2xl">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
