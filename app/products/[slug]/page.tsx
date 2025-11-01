import React from "react";
import Link from "next/link";
// STEP 1: 'fs' aur 'path' ko import karein (yeh file padhne ke liye hai)
import fs from "fs";
import path from "path";

// STEP 2: Product ka type (interface) define karein
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  slug: string;
}

// STEP 3: Seedha file se data padhne ka function
async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // JSON file ka poora path batayein
  const filePath = path.join(process.cwd(), "public/data/products.json");
  // File ko padhein
  const fileData = fs.readFileSync(filePath, "utf8");
  // JSON data ko parse karein
  const products: Product[] = JSON.parse(fileData);

  // File mein se apna product dhoondein
  const product = products.find((p) => p.slug === slug);
  return product;
}

// Server component (async)
export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  
  // STEP 4: 'params' ko 'await' karein (yeh Next.js 16 ke liye zaroori hai)
  const actualParams = await params;
  const { slug } = actualParams;

  // STEP 5: 'fetch' ki jagah, naye function ko call karein
  const product = await getProductBySlug(slug);

  // Agar product nahi mila toh error dikhayein
  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-600">Product not found 😢</p>
    );
  }

  // STEP 6: Product link (ab host ki zaroorat nahi)
  const productLink = `/products/${product.slug}`;

  // Baaki ka aapka JSX code
  return (
    <div className="max-w-md mx-auto mt-10 border rounded-xl shadow p-6 bg-white">
      <img
        src={product.image} // Make sure image path in JSON is like '/images/my-image.jpg'
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