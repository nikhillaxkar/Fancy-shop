import React from "react";
import Link from "next/link";

// STEP 1: Product ka type define karein
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  slug: string;
}

// STEP 2: 'host' URL ko Vercel ke liye dynamically set karein
const host = process.env.VERCEL_URL
  ? "https://" + process.env.VERCEL_URL
  : "http://localhost:3000";

// Server component (async)
// STEP 3: Yahaan 'params' ko Promise ke roop mein type karein
export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  
  // STEP 4: 'params' ko 'await' karein (Error yahaan fix hua hai)
  const actualParams = await params;
  const { slug } = actualParams;

  // 1️⃣ Fetch all products
  const res = await fetch(`${host}/api/products`, {
    cache: "no-store", // Hamesha naya data fetch karega
  });

  if (!res.ok) {
     return (
       <p className="text-center mt-10 text-red-600">Failed to load products 😢</p>
     );
  }

  const products: Product[] = await res.json();

  // 2️⃣ Find product by slug
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-600">Product not found 😢</p>
    );
  }

  // 3️⃣ Product link
  const productLink = `${host}/products/${product.slug}`;

  // 4️⃣ Redirect to Order Form
  return (
    <div className="max-w-md mx-auto mt-10 border rounded-xl shadow p-6 bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-pink-600 font-bold mt-2">₹{product.price}</p>

      {/* 🔗 Redirect to /order page with product info */}
      <Link
        href={`/order?productName=${encodeURIComponent(
          product.name
        )}&productLink=${encodeURIComponent(productLink)}`}
        className="block mt-5 text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
      >
        Proceed to Order
      </Link>
    </div>
  );
}