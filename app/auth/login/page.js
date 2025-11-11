"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password!");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Logging in...");

      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      toast.dismiss();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("✅ Login successful!");
        setTimeout(() => router.push("/admin-dashboard"), 1000);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.dismiss();
      setLoading(false);
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md transition-all"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-700">
          Seller Login
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="border border-gray-300 p-2.5 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={handleChange}
          />
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="border border-gray-300 p-2.5 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className={`w-full py-2.5 rounded-md text-white font-semibold transition ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-5 text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
            onClick={() => router.push("/auth/register")}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}
