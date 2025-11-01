"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

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

  const productSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
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

      {/* 🔸 Banner Slider (smaller, centered) */}
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

      {/* 🔸 Product Carousel */}
      <div className="max-w-7xl mx-auto mt-14 px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 text-left">
          Trending Products 💫
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center">Loading products...</p>
        ) : (
          <Slider {...productSettings}>
            {products.map((item) => (
              <div key={item.id} className="px-3">
                <div className="border rounded-2xl shadow hover:shadow-lg transition bg-white overflow-hidden flex flex-col">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-44 object-cover rounded-t-2xl"
                  />
                  <div className="p-3 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-semibold text-base text-gray-800 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-pink-600 font-bold mt-2 text-sm">
                        ₹{item.price}
                      </p>
                    </div>

                    <Link
                      href={`/products/${item.slug}`}
                      className="mt-3 text-white bg-pink-500 hover:bg-pink-600 py-1.5 rounded-lg text-sm text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>

      <div className="mt-10">
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
