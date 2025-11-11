"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login again!");
      router.push("/auth/login");
      return;
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const form = new FormData();

    form.append("name", formData.name);
    form.append("price", formData.price);
    form.append("category", formData.category);
    form.append("description", formData.description);
    if (imageFile) form.append("image", imageFile);

    try {
      setLoading(true);
      toast.loading("Adding product... please wait ⏳");

      const res = await fetch(`${backendUrl}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();

      toast.dismiss(); // remove loading toast
      setLoading(false);

      if (res.ok) {
        toast.success("✅ Product added successfully!");
        setFormData({ name: "", price: "", category: "", description: "" });
        setImageFile(null);
        setImagePreview(null);

        // Small delay before redirect
        setTimeout(() => {
          router.push("/admin-dashboard/products");
        }, 1000);
      } else {
        toast.error(data.message || "Failed to add product!");
      }
    } catch (err) {
      console.error("❌ Error adding product:", err);
      toast.dismiss();
      setLoading(false);
      toast.error("Error while adding product!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg"
      >
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Add New Product
        </h3>

        {/* Text Inputs */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="border p-2 w-full mb-3 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border p-2 w-full mb-3 rounded"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="border p-2 w-full mb-3 rounded"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full mb-3 rounded"
          rows="3"
          value={formData.description}
          onChange={handleChange}
        />

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">
            Product Image
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded mb-3 border"
            />
          )}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white font-medium transition ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
