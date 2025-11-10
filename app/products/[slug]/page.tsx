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

  useEffect(() => {
    if (!slug) return;

    // ✅ use environment variable or fallback to local backend
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

        // ✅ Your backend returns { success: true, data: {...} }
        setProduct(result.data);
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
    return (
      <p className="text-center mt-10 text-gray-500">Loading product...</p>
    );
  }

  if (error || !product) {
    return (
      <p className="text-center mt-10 text-gray-600">
        {error || "Product not found 😢"}
      </p>
    );
  }

  const productLink = `/products/${product.slug}`;

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-xl shadow p-6 bg-white">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-pink-600 font-bold mt-2">₹{product.price}</p>

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
