"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function OrderForm() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("productName");
  const productLink = searchParams.get("productLink");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // ✅ Ensure the link is valid (local or external)
    let validLink = "";
    if (productLink?.startsWith("/")) {
      // local link (Next.js route)
      validLink = `${window.location.origin}${productLink}`;
    } else if (productLink && !productLink.startsWith("http")) {
      validLink = `https://${productLink}`;
    } else {
      validLink = productLink || "";
    }

    // ✅ WhatsApp message formatting
    const message = encodeURIComponent(
      `🛍️ *New Order Request!*\n\n` +
        `📦 *Product Name:* ${productName}\n` +
        `🔗 *Product Link:* ${validLink}\n\n` +
        `👤 *Customer Details:*\n` +
        `Name: ${form.name}\n` +
        `📞 Phone: ${form.phone}\n` +
        `🏠 Address: ${form.address}\n\n` +
        `✅ Please confirm my order.`
    );

    // ✅ Open WhatsApp
    window.open(`https://wa.me/9649281609?text=${message}`, "_blank");
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-xl shadow-lg p-6 bg-white">
      <h1 className="text-2xl font-bold mb-2 text-center text-green-700">
        🛒 Place Your Order
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Fill your details below to confirm your order instantly on WhatsApp.
      </p>

      <div className="bg-gray-50 border rounded-lg p-3 mb-4">
        <p className="text-gray-800">
          <strong>Product:</strong> {productName}
        </p>

        {productLink && (
          <a
            href={
              productLink.startsWith("/")
                ? `${window.location.origin}${productLink}`
                : productLink.startsWith("http")
                ? productLink
                : `https://${productLink}`
            }
            target="_blank"
            className="text-blue-600 underline text-sm"
          >
            🔗 View Product Details
          </a>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Active WhatsApp Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="address"
          placeholder="Complete Delivery Address (with pincode)"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          🚀 Confirm Order on WhatsApp
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        ⚡ We’ll contact you on WhatsApp within a few minutes to confirm your
        order.
      </p>
    </div>
  );
}
