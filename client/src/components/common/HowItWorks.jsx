const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Sign Up & Choose Role',
      description: 'Create your account and choose to be a Worker or Buyer. Get bonus coins on registration!',
    },
    {
      number: '2',
      title: 'Browse or Create Tasks',
      description: 'Workers can browse available tasks. Buyers can post tasks with coin rewards.',
    },
    {
      number: '3',
      title: 'Complete & Submit',
      description: 'Workers complete tasks and submit their work. Buyers review submissions.',
    },
    {
      number: '4',
      title: 'Get Paid',
      description: 'Approved submissions earn coins. Workers can withdraw when they reach 200 coins.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Start earning in just a few simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
