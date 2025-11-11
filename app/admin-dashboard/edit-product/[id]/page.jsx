"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch existing product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("Please login first!");
                    router.push("/auth/login");
                    return;
                }

                const res = await fetch(`${backendUrl}/api/products/my-products`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();
                const product = data.find((p) => p._id === id);

                if (!product) {
                    toast.error("Product not found!");
                    router.push("/admin-dashboard/products");
                    return;
                }

                setFormData({
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    description: product.description,
                });
                setImagePreview(product.imageUrl);
            } catch (err) {
                toast.error("Error fetching product!");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, backendUrl, router]);

    // ✅ Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // ✅ Handle form submit (PUT request)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login again!");
            router.push("/auth/login");
            return;
        }

        const form = new FormData();
        form.append("name", formData.name);
        form.append("price", formData.price);
        form.append("category", formData.category);
        form.append("description", formData.description);
        if (imageFile) form.append("image", imageFile);

        try {
            toast.loading("Updating product...");
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: form,
            });

            const data = await res.json();
            toast.dismiss();

            if (res.ok) {
                toast.success("✅ Product updated successfully!");
                router.push("/admin-dashboard/products");
            } else {
                toast.error(data.message || "Failed to update product!");
            }
        } catch (err) {
            toast.dismiss();
            toast.error("Error while updating product!");
            console.error(err);
        }
    };

    // ✅ Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
                <p className="animate-pulse text-lg">Loading product details...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center py-10">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg"
                encType="multipart/form-data"
            >
                <h3 className="text-2xl font-semibold mb-6 text-center">
                    Edit Product
                </h3>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 w-full mb-3 rounded"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border p-2 w-full mb-3 rounded"
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-2 w-full mb-3 rounded"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="border p-2 w-full mb-3 rounded"
                ></textarea>

                {/* Image Upload Preview */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                        Product Image
                    </label>

                    {imagePreview && (
                        <div className="relative w-40 h-40 mb-3">
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                className="object-cover rounded border"
                            />
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-yellow-500 text-white w-full py-2 rounded hover:bg-yellow-600 transition"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
}
