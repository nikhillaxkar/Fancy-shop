"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaBoxOpen,
  FaPlusCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserTie,
  FaStore,
  FaHome, // optional if you want a home icon
} from "react-icons/fa";
import toast from "react-hot-toast"; // ✅ Toast import

const navItems = [
  // Added Dashboard link will be rendered separately at top,
  { label: "My Products", href: "/admin-dashboard/products", icon: <FaBoxOpen size={18} /> },
  { label: "Add Product", href: "/admin-dashboard/add-product", icon: <FaPlusCircle size={18} /> },
];

export default function SellerLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sellerData, setSellerData] = useState({ name: "Seller", shopName: "My Store" });
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // ✅ Logout confirmation popup

  // ✅ Fetch seller data from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      router.push("/auth/login");
    } else if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setSellerData({
          name: parsed.name || "Seller",
          shopName: parsed.shopName || "My Store",
        });
      } catch {
        setSellerData({ name: "Seller", shopName: "My Store" });
      }
    }
  }, [router]);

  // ✅ Logout function
  const handleLogout = () => {
    setShowLogoutPopup(false); // close popup
    toast.loading("Logging out...");

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.dismiss();
      toast.success("✅ Logged out successfully!");
      router.push("/auth/login");
    }, 1000);
  };

  const getPageTitle = () => {
    if (pathname === "/admin-dashboard") return "Dashboard Home";
    if (pathname.includes("/add-product")) return "Add Product";
    if (pathname.includes("/products")) return "My Products";
    return "Dashboard";
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 relative">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-gray-200 shadow-sm transition-transform duration-200 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between h-16 px-5 bg-indigo-600 text-white">
          <div className="flex items-center gap-2">
            <FaStore size={18} />
            <h2 className="font-semibold text-lg">{sellerData.shopName}</h2>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Seller Info */}
        <div className="flex flex-col items-center py-6 border-b border-gray-100">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 mb-2">
            <FaUserTie size={20} />
          </div>
          <h3 className="text-sm font-semibold text-gray-700">{sellerData.name}</h3>
          <p className="text-xs text-gray-400">Store Owner</p>
        </div>

        {/* --- NEW: Dashboard shortcut at top of nav --- */}
        <div className="p-4 border-b border-gray-100">
          <Link
            href="/admin-dashboard"
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
              pathname === "/admin-dashboard"
                ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <FaHome size={18} />
            <span>Dashboard Home</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}

          {/* ✅ Logout Button */}
          <button
            onClick={() => setShowLogoutPopup(true)}
            className="flex items-center justify-center gap-2 w-full mt-4 rounded-md bg-red-500 hover:bg-red-600 text-white py-2 text-sm font-medium transition"
          >
            <FaSignOutAlt size={14} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 h-16 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-600"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
          </div>

          {/* Seller Profile (Top Right) */}
          <div className="flex items-center gap-2">
            <span className="hidden md:block text-sm text-gray-600">{sellerData.name}</span>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100 text-indigo-600">
              <FaUserTie size={16} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* ✅ Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to logout from your store dashboard?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
