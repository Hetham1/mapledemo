import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-black text-white">
      {/* Wave SVG Divider */}
      <div className="relative h-16 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 text-orange-900"
              >
                <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
              </svg>
              <h2 className="text-2xl font-bold text-amber-600">MapleAir</h2>
            </div>
            <p className="mb-4 text-gray-300">
              Perfecting comfort, season after season. Your trusted partner for
              all HVAC solutions across Canada.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2 text-amber-600">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2 text-amber-600">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-amber-500"
                />
                <span className="text-gray-300">
                  123 Cooling Avenue, Toronto, ON M5V 2K7, Canada
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={18}
                  className="mr-2 flex-shrink-0 text-amber-500"
                />
                <a
                  href="tel:+14165551234"
                  className="text-gray-300 hover:text-amber-500 transition-colors"
                >
                  (416) 555-1234
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-amber-500" />
                <a
                  href="mailto:info@mapleair.ca"
                  className="text-gray-300 hover:text-amber-500 transition-colors"
                >
                  info@mapleair.ca
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2 text-amber-600">
              Newsletter
            </h3>
            <p className="mb-4 text-gray-300">
              Subscribe to receive updates on special offers and tips for your
              HVAC system.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-amber-900 focus:ring-offset-1 focus:ring-offset-amber-600 focus:outline-none"
              />
              <Button className="bg-amber-700 hover:bg-amber-800 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-amber-600">
            Service Areas
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Toronto",
              "Vancouver",
              "Montreal",
              "Calgary",
              "Ottawa",
              "Edmonton",
              "Winnipeg",
              "Quebec City",
              "Hamilton",
              "Kitchener",
            ].map((city) => (
              <span
                key={city}
                className="bg-gray-900 px-3 py-1 rounded-full text-sm text-gray-300"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} MapleAir HVAC Services. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <Link href="#" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
