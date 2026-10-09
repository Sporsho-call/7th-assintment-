"use client";

import { useEffect, useState, use } from "react";
import { enToBnNumber } from "@/lib/utils";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
        const list = await res.json();
        const found = list.find((item: any) => item.slug === slug || String(item.id) === slug);
        setProduct(found);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) return <div className="text-center py-12 text-sm text-gray-500">তথ্য লোড হচ্ছে...</div>;
  if (!product) return <div className="text-center py-12 text-sm text-red-500">পণ্যটি পাওয়া যায়নি।</div>;

  const mins = product.markets?.map((m: any) => m.min) || [product.today];
  const maxs = product.markets?.map((m: any) => m.max) || [product.today];
  const minPrice = Math.min(...mins);
  const maxPrice = Math.max(...maxs);
  const avgPrice = Math.round(mins.reduce((a: number, b: number) => a + b, 0) / mins.length);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Summary */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-4xl p-2 bg-gray-50 rounded-lg">{product.image}</div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{product.nameBn}</h1>
            <p className="text-xs text-gray-400">প্রতি {product.unit === "kg" ? "কেজি" : product.unit}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-400 block">আজকের দাম</span>
          <span className="text-2xl font-black text-emerald-600">{enToBnNumber(product.today)} ৳</span>
        </div>
      </div>

      {/* Min / Max / Avg */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <span className="text-xs text-gray-400 block">সর্বনিম্ন দাম</span>
          <span className="text-base font-bold text-emerald-600">{enToBnNumber(minPrice)} টাকা</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <span className="text-xs text-gray-400 block">সর্বোচ্চ দাম</span>
          <span className="text-base font-bold text-red-500">{enToBnNumber(maxPrice)} টাকা</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <span className="text-xs text-gray-400 block">গড় দাম</span>
          <span className="text-base font-bold text-gray-800">{enToBnNumber(avgPrice)} টাকা</span>
        </div>
      </div>

      {/* Market Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden text-xs">
        <div className="p-3 bg-gray-50 border-b border-gray-100 font-bold text-gray-800">
          বাজারভিত্তিক আজকের দাম
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400">
                <th className="p-3">বাজার</th>
                <th className="p-3">বিভাগ</th>
                <th className="p-3">সর্বনিম্ন</th>
                <th className="p-3">সর্বোচ্চ</th>
                <th className="p-3">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {product.markets?.map((m: any, i: number) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="p-3 font-medium text-gray-800">{m.market}</td>
                  <td className="p-3 text-gray-400">{m.division}</td>
                  <td className="p-3 text-emerald-600 font-medium">{enToBnNumber(m.min)} টাকা</td>
                  <td className="p-3 text-red-500 font-medium">{enToBnNumber(m.max)} টাকা</td>
                  <td className="p-3 font-bold text-gray-800">{enToBnNumber(Math.round((m.min + m.max) / 2))} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}