const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MicroEarn</h3>
            <p className="text-gray-400">
              A platform connecting workers and buyers for micro-tasks.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Workers</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Browse Tasks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Earnings
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Buyers</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Post a Task
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 MicroEarn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
