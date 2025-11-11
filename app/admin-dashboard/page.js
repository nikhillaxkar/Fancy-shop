"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBoxOpen, FaPlusCircle } from "react-icons/fa";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("Admin");

  // ✅ Fetch admin name from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setAdminName(parsed.name || "Admin");
      } catch {
        setAdminName("Admin");
      }
    }
  }, []);

  return (
    <div className="p-6 md:p-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-md p-8 text-center border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome back, {adminName}! 👋
        </h1>
        <p className="text-slate-500 mt-2">
          Manage your product listings below.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/admin-dashboard/add-product"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-5 py-3 text-sm font-medium shadow-md hover:bg-indigo-700 transition"
          >
            <FaPlusCircle size={18} />
            Add New Product
          </Link>

          <Link
            href="/admin-dashboard/products"
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white text-slate-700 px-5 py-3 text-sm font-medium shadow-sm hover:bg-slate-100 transition"
          >
            <FaBoxOpen size={18} />
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
