"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description?: string;
  imageUrl?: string;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center center", transform: "scale(1)" });

  useEffect(() => {
    if (!slug) return;

    const backendBaseUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    const backendUrl = `${backendBaseUrl}/api/products/${slug}`;

    const fetchProduct = async () => {
      try {
        const res = await fetch(backendUrl, {
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch product");

        const result = await res.json();
        console.log("Fetched product:", result);

        setProduct(result.data || result.product || result);
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading product...</p>;
  }

  if (error || !product) {
    return (
      <p className="text-center mt-10 text-gray-600">
        {error || "Product not found 😢"}
      </p>
    );
  }

  const productLink = `/products/${product.slug}`;

  // 🧠 Amazon-style zoom handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transformOrigin: "center center", transform: "scale(1)" });
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-xl shadow p-6 bg-white">
      {/* 🖼️ Amazon-like zoomable image */}
      <div
        className="relative w-full h-80 bg-white flex items-center justify-center overflow-hidden border-b border-gray-100 rounded-lg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            transition: "transform 0.2s ease-out, transform-origin 0.2s ease-out",
            ...zoomStyle,
          }}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-pink-600 font-bold mt-2">₹{product.price}</p>

      <Link
        href={`/order?productName=${encodeURIComponent(
          product.name
        )}&productLink=${encodeURIComponent(productLink)}`}
        className="block mt-5 text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all"
      >
        Proceed to Order
      </Link>
    </div>
  );
}
