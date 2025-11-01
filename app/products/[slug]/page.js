import React from "react";
import Link from "next/link";

export default async function ProductDetail({ params }) {
  // ✅ Unwrap the params (Next.js 14+ fix)
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 1️⃣ Fetch all products
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products`
  );
  const products = await res.json();

  // 2️⃣ Find product by slug
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-600">Product not found 😢</p>
    );
  }

  // 3️⃣ Product link
  const productLink = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/products/${product.slug}`;

  // 4️⃣ Redirect to Order Form instead of WhatsApp
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
