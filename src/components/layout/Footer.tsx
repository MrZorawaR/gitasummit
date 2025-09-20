import Link from "next/link";
import { Mail, Building, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-6 text-white">
              Youth Gita Summit 2025
            </h3>
            <p className="mb-6 max-w-xs text-gray-400">
              Illuminating the path for tomorrow's leaders through the eternal wisdom of the Srimad Bhagavad Gita.
            </p>
            <blockquote className="border-l-2 border-amber-600 pl-4 my-6">
              <p className="text-lg italic text-gray-300">
                "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन"
              </p>
              <p className="text-sm text-gray-400 mt-2">
                "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."
              </p>
            </blockquote>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="hover:underline hover:text-amber-500 transition-colors">
                  About the Summit
                </Link>
              </li>
              <li>
                <Link href="#register" className="hover:underline hover:text-amber-500 transition-colors">
                  Register Now
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:underline hover:text-amber-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <Building size={20} className="text-amber-500 shrink-0 mt-1" />
                <span>
                  Manav Rachna Educational Institutions, Faridabad (Haryana)
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-amber-500" />
                <span>8527695490 (Dr. Gurjeet Kaur Chawla)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-amber-500" />
                <span>info@youthgitasummit.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} Youth Gita Summit | A GIEO Gita Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;