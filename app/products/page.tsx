"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ✅ Product type (matches your backend schema)
interface Product {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  slug: string;
}

export default function ProductsPage() {
  // ✅ Define product list & search term
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Backend base URL (from .env or fallback)
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  // ✅ Fetch data from your backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products`);
        const data = await res.json();

        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Failed to load products");
        }
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [backendUrl]);

  // ✅ Filter products by search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* 🛍️ Products Grid */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10 text-lg">Loading products...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl shadow hover:shadow-lg transition bg-white overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-pink-600 font-bold mt-2">₹{product.price}</p>

                <Link
                  href={`/products/${product.slug}`}
                  className="block mt-3 text-white bg-pink-500 hover:bg-pink-600 py-2 rounded-lg text-center text-sm"
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
