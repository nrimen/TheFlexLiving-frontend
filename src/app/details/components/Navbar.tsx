"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LucideMenu, LucideX, LucideHome, LucideUser, LucideBriefcase, LucidePhone } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "Landlords", href: "/", icon: <LucideHome size={16} /> },
    { label: "About Us", href: "/about", icon: <LucideUser size={16} /> },
    { label: "Careers", href: "/careers", icon: <LucideBriefcase size={16} /> },
    { label: "Contact", href: "/contact", icon: <LucidePhone size={16} /> },
    { label: "English", href: "#", icon: null },
    { label: "GBP", href: "#", icon: null },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5); 
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full transition-colors duration-300 shadow-md ${
        scrolled ? "bg-gray-100 text-gray-800" : "bg-white text-gray-800"
      }`}
      style={{ height: "80px", zIndex: 50 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/">
            <img src="/images/image.webp" alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-15">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 hover:text-gray-500 font-medium transition-colors"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none p-2 rounded hover:bg-gray-200 transition-colors"
          >
            {isOpen ? <LucideX size={24} /> : <LucideMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-2 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block px-3 py-2 rounded-md text-gray-800 hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
