const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Top Rated Worker',
      image: 'https://i.pravatar.cc/150?u=sarah',
      content: 'MicroEarn changed my life! I started as a student looking to earn some extra pocket money, and now I manage a steady stream of income daily. The payouts are truly instant.',
      rating: 5,
      achievement: 'Earned $1.2k+',
    },
    {
      name: 'Michael Chen',
      role: 'Startup Founder',
      image: 'https://i.pravatar.cc/150?u=michael',
      content: 'As a buyer, finding reliable people for data tagging was a nightmare. Here, the quality of work is exceptional and the interface makes managing tasks effortless.',
      rating: 5,
      achievement: '100+ Tasks Posted',
    },
    {
      name: 'Amara Okafor',
      role: 'Graphic Designer',
      image: 'https://i.pravatar.cc/150?u=amara',
      content: 'The platform is incredibly smooth. I love how secure the coin system is. It feels like a professional workplace where quality work is actually rewarded.',
      rating: 5,
      achievement: '99% Success Rate',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-indigo-600 font-black tracking-widest uppercase text-sm mb-3">Community Love</h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Users Say</span>
          </h3>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Join 20,000+ happy users earning and growing on the world's most trusted micro-task platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-100 p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 italic leading-relaxed mb-8">
                "{testimonial.content}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-4 ring-indigo-50"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter block mb-1">Achievement</span>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {testimonial.achievement}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Stats Overlay */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-40">
          <span className="text-2xl font-black text-gray-400 grayscale hover:grayscale-0 transition-all cursor-default">4.9/5 RATING</span>
          <span className="text-2xl font-black text-gray-400 grayscale hover:grayscale-0 transition-all cursor-default">TRUSTED BY 500+ BRANDS</span>
          <span className="text-2xl font-black text-gray-400 grayscale hover:grayscale-0 transition-all cursor-default">99% SATISFACTION</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
