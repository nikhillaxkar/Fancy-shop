"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // default role
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields!");
      return;
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      setLoading(true);
      toast.loading("Registering...");

      const res = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      toast.dismiss();
      setLoading(false);

      if (res.ok) {
        toast.success("✅ Registered successfully!");
        setTimeout(() => router.push("/auth/login"), 1000);
      } else {
        toast.error(data.message || "Registration failed!");
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
          Seller Registration
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="border border-gray-300 p-2.5 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={handleChange}
          />
        </div>

        {/* Email Field */}
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

        {/* Password Field */}
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
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
            onClick={() => router.push("/auth/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
