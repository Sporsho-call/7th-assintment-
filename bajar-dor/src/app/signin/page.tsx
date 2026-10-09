"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authClient.signIn.email({ email, password });
      if (res.error) {
        toast.error(res.error.message || "লগইন ব্যর্থ হয়েছে");
      } else {
        toast.success("সফলভাবে সাইন ইন করেছেন!");
        window.location.href = "/";
      }
    } catch {
      toast.error("লগইন করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto my-12 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm text-xs">
      <h2 className="text-xl font-bold text-center text-gray-900 mb-1">সাইন ইন</h2>
      <p className="text-center text-gray-400 mb-6">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-gray-600 mb-1">ইমেইল</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">পাসওয়ার্ড</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition"
        >
          {loading ? "প্রসেসিং..." : "সাইন ইন"}
        </button>
      </form>

      <div className="text-center my-4 text-gray-400">অথবা</div>

      <button
        onClick={() => authClient.signIn.social({ provider: "google" })}
        className="w-full border border-gray-200 py-2 rounded-lg flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 mb-4"
      >
        <span>🔍</span> Google দিয়ে চালিয়ে যান
      </button>

      <div className="text-center text-gray-500">
        অ্যাকাউন্ট নেই? <Link href="/signup" className="text-emerald-600 font-bold">সাইন আপ করুন</Link>
      </div>
    </div>
  );
}