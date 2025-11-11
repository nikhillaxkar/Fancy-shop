"use client";

import { Facebook, Instagram, Twitter, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // 🔒 Hide footer on admin or auth routes
  const hideFooter =
    pathname.startsWith("/admin-dashboard") || pathname.startsWith("/auth");

  if (hideFooter) return null;

  return (
    <footer className="bg-gradient-to-r from-pink-100 via-pink-50 to-white text-gray-700 py-10 mt-10 border-t border-pink-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Brand Name */}
        <h2 className="text-3xl font-extrabold text-pink-600 mb-2 tracking-wide">
          Fancy<span className="text-gray-800">Shop</span>
        </h2>

        {/* Short Description */}
        <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base mb-8">
          ✨ Bringing sparkle and style to your life — discover beautiful bangles,
          keychains, lights & more.
        </p>

        {/* Social Links */}
        <div className="flex justify-center flex-wrap gap-6 mb-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white shadow hover:bg-pink-100 transition-all duration-300"
          >
            <Facebook size={22} className="text-pink-600" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white shadow hover:bg-pink-100 transition-all duration-300"
          >
            <Instagram size={22} className="text-pink-600" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white shadow hover:bg-pink-100 transition-all duration-300"
          >
            <Twitter size={22} className="text-pink-600" />
          </a>
          <a
            href="tel:+919649281609"
            className="p-3 rounded-full bg-white shadow hover:bg-pink-100 transition-all duration-300"
          >
            <Phone size={22} className="text-pink-600" />
          </a>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-pink-600 transition">
            Home
          </a>
          <a href="/about" className="hover:text-pink-600 transition">
            About
          </a>
          <a href="/shop" className="hover:text-pink-600 transition">
            Shop
          </a>
          <a href="/contact" className="hover:text-pink-600 transition">
            Contact
          </a>
          <a href="/privacy-policy" className="hover:text-pink-600 transition">
            Privacy Policy
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-pink-600">FancyShop</span> | All
          Rights Reserved 💫
        </p>
      </div>
    </footer>
  );
}
