"use client";
import { MessageCircle } from "lucide-react"; // WhatsApp icon (modern)

export default function ProductCard({ name, price, image, description }) {
  return (
    <div className="bg-white border border-pink-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-52 object-cover rounded-t-2xl"
        />
        {/* Decorative corner ribbon */}
        <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
          New
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        <p className="font-bold text-pink-600 mt-2 text-lg">₹{price}</p>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/91XXXXXXXXXX?text=Hi! I want to order *${name}* from Fancy Shop.`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-pink-500 text-white font-medium py-2.5 rounded-xl hover:bg-pink-600 transition-all duration-300"
        >
          <MessageCircle size={18} />
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
