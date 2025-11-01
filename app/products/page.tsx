"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// STEP 1: Product ka type define karein (TypeScript error fix)
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  slug: string;
}

export default function ProductsPage() {
  // STEP 2: useState ko batayein ki yeh Product ka array hai (TypeScript error fix)
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Client-side fetch relative URL ('/api/products') use karta hai, jo sahi hai
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // 🔍 Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4"> {/* ✅ UI FIX: Padding kam kar di (p-6 se p-4) */}
      {/* 🔍 Search bar */}
      <div className="flex justify-center mb-6"> {/* ✅ UI FIX: Margin kam kar di (mb-8 se mb-6) */}
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* 🛍️ Products Grid */}
      {filteredProducts.length > 0 ? (
        // ✅ UI FIX: 'grid-cols-2' ko default banaya (mobile ke liye)
        // aur 'gap-4' kiya (screenshot jaisa)
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl shadow hover:shadow-lg transition bg-white overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                // ✅ UI FIX: Image height ko mobile ke liye adjust kiya (h-56 se h-44)
                className="w-full h-44 object-cover" 
              />
              <div className="p-3"> {/* ✅ UI FIX: Padding kam ki (p-4 se p-3) */}
                {/* ✅ UI FIX: Font size kam kiya (text-lg se text-base) */}
                <h2 className="text-base font-semibold truncate">{product.name}</h2> 
                <p className="text-gray-600 text-xs mt-1 line-clamp-2"> {/* ✅ UI FIX: Font size kam kiya (text-sm se text-xs) */}
                  {product.description}
                </p>
                <p className="text-pink-600 font-bold mt-2 text-sm">₹{product.price}</p> {/* ✅ UI FIX: Font size kam kiya */}

                <Link
                  href={`/products/${product.slug}`}
                  className="block mt-3 text-white bg-pink-500 hover:bg-pink-600 py-1.5 rounded-lg text-center text-sm" // ✅ UI FIX: Padding kam ki
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