"use client";
import Link from "next/link";

export default function AuthLayoutClient({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-white to-pink-50 relative overflow-hidden px-4 sm:px-6">
      {/* 🎨 Background Shapes (soft gradient blobs) */}
      <div className="absolute top-[-6rem] left-[-6rem] w-64 h-64 sm:w-80 sm:h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-6rem] right-[-6rem] w-64 h-64 sm:w-80 sm:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-200"></div>

      {/* 🧩 Auth Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-6 sm:p-8 border border-pink-100 transition-all">
        {/* 🌸 Logo + Heading */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="text-3xl sm:text-4xl font-extrabold text-pink-600 tracking-wide"
          >
            Fancy<span className="text-gray-800">Shop</span>
          </Link>
          <p className="text-gray-500 mt-2 text-sm sm:text-base leading-snug">
            Welcome back! Please login or register below.
          </p>
        </div>

        {/* 🧾 Dynamic content (login/register form) */}
        <div className="w-full">{children}</div>

        {/* 🏠 Back to home */}
        <div className="text-center mt-6 text-sm sm:text-base">
          <Link
            href="/"
            className="text-pink-600 hover:text-pink-700 transition-colors duration-200 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
