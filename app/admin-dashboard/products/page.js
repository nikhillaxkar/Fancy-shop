"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // ✅ Fetch products for logged-in user
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        router.push("/auth/login");
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${backendUrl}/api/products/my-products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          toast.error("Failed to load products!");
        }
      } catch (err) {
        toast.error("Error fetching products!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [router]);

  // ✅ Delete single product
  const handleDelete = async (productId) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login again!");
      return;
    }

    try {
      setDeleting(true);
      toast.loading("Deleting product...");

      const res = await fetch(`${backendUrl}/api/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      toast.dismiss();

      if (res.ok) {
        toast.success("🗑️ Product deleted successfully!");
        setProducts((prev) => prev.filter((p) => p._id !== productId));
      } else {
        toast.error(data.message || "Failed to delete product!");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Error deleting product!");
    } finally {
      setDeleting(false);
    }
  };

  // ✅ Delete all products
  const handleDeleteAll = async () => {
    const confirmAll = confirm("⚠️ Are you sure you want to delete ALL your products?");
    if (!confirmAll) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login again!");
      return;
    }

    try {
      setDeleting(true);
      toast.loading("Deleting all products...");

      const res = await fetch(`${backendUrl}/api/products/delete-all`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      toast.dismiss();

      if (res.ok) {
        toast.success("🗑️ All products deleted!");
        setProducts([]);
      } else {
        toast.error(data.message || "Failed to delete all!");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Error deleting all products!");
    } finally {
      setDeleting(false);
    }
  };

  // ✅ Loading Screen
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        <p className="animate-pulse text-lg">Loading products...</p>
      </div>
    );
  }

  // ✅ Empty State
  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-500">
        <p className="text-lg mb-4">No products found.</p>
        <button
          onClick={() => router.push("/admin-dashboard/add-product")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          + Add Product
        </button>
      </div>
    );
  }

  // ✅ Main Table
  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-md w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          My Products ({products.length})
        </h2>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => router.push("/admin-dashboard/add-product")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            disabled={deleting}
          >
            + Add New
          </button>
          <button
            onClick={handleDeleteAll}
            className={`px-4 py-2 rounded-md text-white transition ${
              deleting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete All"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-100">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-indigo-50 border-b text-gray-700">
              <th className="border p-3 text-left w-10">No.</th>
              <th className="border p-3 text-left">Image</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Price (₹)</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className="hover:bg-indigo-50 transition-colors duration-150 border-b"
              >
                <td className="border p-3 font-medium text-gray-600">
                  {index + 1}
                </td>
                <td className="border p-3">
                  <div className="relative w-14 h-14 rounded overflow-hidden border">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="border p-3 font-semibold text-gray-700">
                  {product.name}
                </td>
                <td className="border p-3 text-gray-600">₹{product.price}</td>
                <td className="border p-3 text-center">
                  <button
                    onClick={() =>
                      router.push(`/admin-dashboard/edit-product/${product._id}`)
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition mr-2"
                    disabled={deleting}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className={`text-white px-3 py-1 rounded-md text-sm transition ${
                      deleting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                    disabled={deleting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
