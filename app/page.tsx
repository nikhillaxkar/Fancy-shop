"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
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
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [backendUrl]);

  const bannerImages = [
    "/images/dimond.jpg",
    "/images/golden image.jpg",
    "/images/sliver image.jpg",
    "/images/pear nacklash.jpg",
  ];

  const bannerSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 900,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="text-center mt-8">
      {/* 🔸 Welcome Section */}
      <div className="px-4">
        <h1 className="text-4xl font-bold mb-4 text-pink-600 drop-shadow-sm">
          Welcome to Fancy Shop ✨
        </h1>
        <p className="mb-8 text-gray-600 text-lg max-w-2xl mx-auto">
          Explore beautiful and stylish fancy items — bangles, lights, gifts & more.
        </p>

        <Link
          href="/products"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
        >
          View All Products
        </Link>
      </div>

      {/* 🔸 Banner Slider */}
      <div className="max-w-4xl mx-auto mt-10 rounded-2xl overflow-hidden shadow-lg">
        <Slider {...bannerSettings}>
          {bannerImages.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Banner ${index + 1}`}
                className="w-full h-[260px] sm:h-[320px] md:h-[360px] object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* 🔸 Product Grid */}
      <div className="max-w-7xl mx-auto mt-14 px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 text-left">
          Trending Products 💫
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-center">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.slice(0, 8).map((item) => (
              <div
                key={item._id}
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white overflow-hidden flex flex-col"
              >
                {/* 🖼️ Image Section */}
                <div className="relative w-full h-[220px] sm:h-[250px] bg-white flex items-center justify-center overflow-hidden border-b border-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* 📝 Details Section */}
                <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 text-left">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-gray-800 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-pink-600 font-bold mt-2 text-sm sm:text-base">
                      ₹{item.price}
                    </p>
                  </div>

                  <Link
                    href={`/products/${item.slug}`}
                    className="mt-3 text-white bg-pink-500 hover:bg-pink-600 py-1.5 rounded-lg text-sm text-center transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔸 View All Products Button */}
      <div className="mt-10 mb-10">
        <Link
          href="/products"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
