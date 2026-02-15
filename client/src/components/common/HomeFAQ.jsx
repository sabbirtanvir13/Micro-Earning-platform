import React, { useState } from 'react';

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I start earning on MicroEarn?',
      answer: 'Getting started is easy! Simply create an account, complete your profile, and browse available tasks. Each task has clear instructions and reward amounts. Complete tasks, submit your work, and get paid once approved.'
    },
    {
      question: 'What types of tasks are available?',
      answer: 'We offer a wide variety of tasks including data entry, content moderation, surveys, app testing, social media tasks, transcription, and more. New tasks are added daily to keep opportunities fresh.'
    },
    {
      question: 'How and when do I get paid?',
      answer: 'You can withdraw your earnings once you reach the minimum threshold of 200 coins. We offer multiple payment methods including PayPal, bank transfer, and digital wallets. Payments are typically processed within 24-48 hours.'
    },
    {
      question: 'Is MicroEarn available worldwide?',
      answer: 'Yes! MicroEarn is available globally in most countries. However, some tasks may have geographic restrictions based on client requirements. You can see which tasks are available in your region when browsing.'
    },
    {
      question: 'Are there any fees to join or use the platform?',
      answer: 'Joining MicroEarn is completely free. We only charge a small commission on completed tasks, which is already factored into the reward amounts shown. No hidden fees or charges.'
    },
    {
      question: 'How are tasks approved and payments confirmed?',
      answer: 'Each task goes through a quality review process. Once your submission is approved by the task creator or our moderation team, the coins are automatically added to your account. You can track all your submissions in real-time.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Got questions? We've got answers. Find everything you need to know about MicroEarn.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeWidth={2} />
                </svg>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Still have questions?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
