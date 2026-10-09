"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
        setProducts(await res.json());
      } catch {
        const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
        setProducts(await res.json());
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  const topRisers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const topFallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-10">
      <Hero />

      {/* Section A: Risers */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
          <span className="text-red-500">▲</span> আজ দাম বেড়েছে
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {topRisers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* Section B: Fallers */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
          <span className="text-emerald-600">▼</span> আজ দাম কমেছে
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {topFallers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* Section C: All Products */}
      <section id="সব-পণ্য" className="space-y-3 pt-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">সব পণ্য</h2>
          <p className="text-xs text-gray-400">সকল নিত্যপ্রয়োজনীয় পণ্যের তালিকা</p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}