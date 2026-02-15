const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Join the Ecosystem',
      description: 'Create your account in seconds and select your role. Workers earn, Buyers grow.',
      tip: 'Get 10/50 bonus coins on signup!',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      color: 'blue',
    },
    {
      number: '02',
      title: 'Marketplace Match',
      description: 'Buyers post high-impact tasks while Workers browse for the best opportunities.',
      tip: '1,000+ tasks posted daily',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'purple',
    },
    {
      number: '03',
      title: 'Quality Execution',
      description: 'Complete tasks with precision. Our proof-validation system ensuring fair rewards.',
      tip: 'AI-assisted verification',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      color: 'indigo',
    },
    {
      number: '04',
      title: 'Global Payout',
      description: 'Secure your earnings. Withdraw instantly once you hit the 200 coin milestone.',
      tip: '99.9% payout success rate',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'pink',
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative SVG Pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-blue-200" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-blue-600 font-black tracking-widest uppercase text-sm mb-3">Simple Process</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Four Steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Financial Freedom</span>
            </h3>
          </div>
          <div className="hidden md:block">
            <p className="text-gray-500 font-medium max-w-xs border-l-4 border-blue-600 pl-4 py-2">
              Our streamlined workflow ensures you spend less time figuring out the app and more time earning.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-100 via-indigo-200 to-pink-100 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Card */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-white hover:border-blue-100 transition-all duration-500 group-hover:-translate-y-4 relative z-10 overflow-hidden">
                  {/* Hover Background Glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${step.color}-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2`}></div>

                  {/* Icon & Number Row */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-${step.color}-100 flex items-center justify-center text-${step.color}-600 group-hover:scale-110 transition-transform duration-500`}>
                      {step.icon}
                    </div>
                    <span className="text-5xl font-black text-gray-100 group-hover:text-gray-200 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Tooltip/Badge */}
                  <div className={`inline-flex items-center px-4 py-2 rounded-full bg-${step.color}-50 text-${step.color}-700 text-xs font-bold ring-1 ring-${step.color}-100`}>
                    ✨ {step.tip}
                  </div>
                </div>

                {/* Vertical Line for Mobile/Tablet */}
                {index !== steps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 bottom-0 w-px h-8 bg-gray-200 -translate-x-1/2 translate-y-full z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex flex-col items-center">
          <div className="w-20 h-1 bg-blue-600 rounded-full mb-8"></div>
          <p className="text-gray-500 font-bold italic text-center">
            Ready to take the first step? <br className="md:hidden" /> Join 50,000+ others already in the ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
