"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  slug: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products`);
        const data = await res.json();

        const productArray = Array.isArray(data)
          ? data
          : data.data || data.products || [];

        setProducts(Array.isArray(productArray) ? productArray : []);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [backendUrl]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-3 sm:px-6 py-6">
      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 md:w-1/2 border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
        />
      </div>

      {/* 🛍️ Product Grid */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          Loading products...
        </p>
      ) : filteredProducts.length > 0 ? (
        <div
          className="
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            gap-4 
            sm:gap-6
          "
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="
                border 
                border-gray-200 
                rounded-xl 
                bg-white 
                shadow-sm 
                hover:shadow-md 
                transition-all 
                duration-300 
                flex 
                flex-col 
                overflow-hidden
              "
            >
              {/* 🖼️ Image Section */}
              <div className="relative w-full aspect-[3/4] bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* 📝 Product Info */}
              <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                    {product.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-pink-600 font-bold mt-2 text-sm sm:text-base">
                    ₹{product.price}
                  </p>
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className="
                    mt-3 
                    bg-pink-500 
                    hover:bg-pink-600 
                    text-white 
                    py-1.5 
                    rounded-lg 
                    text-sm 
                    text-center 
                    transition-all 
                    duration-300
                  "
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No products found for “{searchTerm}”
        </p>
      )}
    </div>
  );
}
