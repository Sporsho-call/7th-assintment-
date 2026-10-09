"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম প্রদান করুন");
      return;
    }

    setLoading(true);
    try {
      await authClient.updateUser({
        name: name,
      });
      toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
      router.push("/profile");
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto my-12 p-6 bg-white rounded-xl border border-gray-100 text-xs space-y-4">
      <h2 className="text-lg font-bold text-gray-900">তথ্য আপডেট করুন</h2>
      <form onSubmit={handleUpdate} className="space-y-3">
        <div>
          <label className="block text-gray-600 mb-1">নতুন নাম</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নাম লিখুন"
            className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition"
        >
          {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
        </button>
      </form>
    </div>
  );
}