import {
  Search,
  Home,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer>
      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 py-20 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your next stay is just a few clicks away 🏠
          </h2>

          {/* Subheading */}
          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of students who found their perfect stay with
            StaySarthi
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group flex items-center gap-3 bg-white text-cyan-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Find Your Stay</span>
            </button>

            <button className="group flex items-center gap-3 bg-transparent text-white font-semibold px-8 py-4 rounded-xl border-2 border-white hover:bg-white hover:text-cyan-600 transition-all duration-300 hover:-translate-y-1">
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>List Your Property</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-bold">
                  <span className="text-white">Stay</span>
                  <span className="text-cyan-500">Sarthi</span>
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Making student accommodation search stress-free. Real photos, no
                brokers, transparent pricing.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 group"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 group"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 group"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    Find Stays
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    List Property
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* For Students */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">
                For Students
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    PG Near Me
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    Hostels
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    Flats
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-500 transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:support@staysarthi.com"
                    className="hover:text-cyan-500 transition-colors"
                  >
                    support@staysarthi.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <a
                    href="tel:+911234567890"
                    className="hover:text-cyan-500 transition-colors"
                  >
                    +91 123 456 7890
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <span>Mumbai, Maharashtra, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 StaySarthi. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
