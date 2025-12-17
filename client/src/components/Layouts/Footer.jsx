import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            Cartifya
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            A modern e-commerce platform for quality products,
            fast delivery, and secure payments.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Track Order</li>
            <li className="hover:text-white cursor-pointer">
              Returns & Refunds
            </li>
            <li className="hover:text-white cursor-pointer">Shipping Info</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: ritvijverma18@gmail.com</li>
            <li>Phone: +91-9919122238</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-6 px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 text-center md:text-left">
        <p>
          © {new Date().getFullYear()} Cartifya. All Rights Reserved.
        </p>

        <p className="mt-2 md:mt-0">
          Built with ❤️ using React & Tailwind • Designed & Developed by Ritvij
        </p>
      </div>
    </footer>
  );
};

export default Footer;
