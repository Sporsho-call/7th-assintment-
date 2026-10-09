"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import { sortProducts } from "@/lib/utils";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [products, setProducts] = useState<any[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    async function loadCategoryData() {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${slug}`),
          fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`)
        ]);
        if (catRes.ok) setCategoryInfo(await catRes.json());
        if (prodRes.ok) setProducts(await prodRes.json());
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    }
    loadCategoryData();
  }, [slug]);

  const sortedList = sortProducts(products, sortOption);

  if (!loading && !categoryInfo) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">ক্যাটাগরি পাওয়া যায়নি!</h2>
        <Link href="/" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white p-5 rounded-xl border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{categoryInfo?.icon || "📦"}</div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{categoryInfo?.nameBn || slug}</h1>
            <p className="text-xs text-gray-400">প্রতি পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>

        {/* Challenge C1: Sorting dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">সাজান:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="default">ডিফল্ট</option>
            <option value="lowToHigh">দাম: কম থেকে বেশি</option>
            <option value="highToLow">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {sortedList.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}