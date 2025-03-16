"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Home,
  Info,
  Settings,
  Phone,
  Package,
  MessageCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileNav({ openChat }: { openChat: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isOpen &&
        !target.closest("#mobile-menu") &&
        !target.closest("#menu-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setPricingOpen(false);
    }
  };

  const togglePricing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPricingOpen(!pricingOpen);
  };

  const handleChatClick = () => {
    openChat();
    setIsOpen(false); // Close the mobile menu
  };

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        id="menu-button"
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-black text-white shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-0 z-40 bg-black/95 pt-20 pb-6 px-6 flex flex-col"
          >
            {/* Logo */}
            <div className="flex items-center mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 text-amber-500"
              >
                <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
              </svg>
              <h2 className="text-xl font-bold text-amber-500">MapleAir</h2>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1">
              <ul className="space-y-4 text-lg">
                <li>
                  <button
                    onClick={handleChatClick}
                    className="flex items-center py-2 w-full text-white hover:text-amber-500 transition-colors"
                  >
                    <MessageCircle size={20} className="mr-3" />
                    Chat with AI Assistant
                  </button>
                </li>
                <li>
                  <Link
                    href="/"
                    className="flex items-center py-2 text-white hover:text-amber-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home size={20} className="mr-3" />
                    Home
                  </Link>
                </li>
                <li>
                  <div className="py-2">
                    <button
                      onClick={togglePricing}
                      className="flex items-center w-full text-white hover:text-amber-500 transition-colors"
                    >
                      <Package size={20} className="mr-3" />
                      Pricing
                      {pricingOpen ? (
                        <ChevronUp size={20} className="ml-auto" />
                      ) : (
                        <ChevronDown size={20} className="ml-auto" />
                      )}
                    </button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {pricingOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-8 mt-2 space-y-2 overflow-hidden"
                        >
                          <li>
                            <Link
                              href="#pre-package"
                              className="block py-1 text-gray-300 hover:text-amber-500 transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              Pre-Package
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#custom-package"
                              className="block py-1 text-gray-300 hover:text-amber-500 transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              Custom-Package
                            </Link>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="flex items-center py-2 text-white hover:text-amber-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone size={20} className="mr-3" />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="flex items-center py-2 text-white hover:text-amber-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Info size={20} className="mr-3" />
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Contact Info */}
            <div className="mt-auto pt-6 border-t border-gray-800">
              <p className="text-gray-500 text-sm mb-2">Need help? Call us:</p>
              <a
                href="tel:+14165551234"
                className="text-amber-500 font-semibold text-lg"
              >
                (416) 555-1234
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
