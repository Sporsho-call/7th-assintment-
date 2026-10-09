"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { enToBnNumber } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("https://api.api-store.workers.dev/api/bazardor/categories"),
          fetch("https://api.api-store.workers.dev/api/bazardor/products")
        ]);
        if (catRes.ok) setCategories(await catRes.json());
        if (prodRes.ok) setProducts(await prodRes.json());
      } catch {
        // Fallback API
        try {
          const [catRes, prodRes] = await Promise.all([
            fetch("https://api.abcz.workers.dev/api/bazardor/categories"),
            fetch("https://api.abcz.workers.dev/api/bazardor/products")
          ]);
          if (catRes.ok) setCategories(await catRes.json());
          if (prodRes.ok) setProducts(await prodRes.json());
        } catch (e) {
          console.error(e);
        }
      }
    }
    fetchData();
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Navbar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Logo Image directly from public folder */}
          <img
            src="/logo-icon.png"
            alt="বাজার দর লোগো"
            className="w-8 h-8 object-contain"
          />
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-none">বাজার দর</h1>
            <span className="text-[11px] text-gray-400">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</span>
          </div>
        </Link>

        {/* Auth status / buttons */}
        <div className="relative">
          {session ? (
            <div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                  {session.user.name?.[0] || "U"}
                </div>
                <span>{session.user.name}</span>
                <span className="text-xs text-gray-400">▼</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 text-sm">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="font-semibold text-gray-800">{session.user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    👤 আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-1"
                  >
                    ↩ সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="text-sm text-gray-700 px-3 py-1.5 rounded-lg hover:text-emerald-600"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg font-medium transition"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Category Links Row */}
      <div className="border-t border-gray-100 bg-white overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-4 py-2 text-xs">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1 px-3 py-1 rounded-full whitespace-nowrap transition ${
                  isActive
                    ? "bg-emerald-600 text-white font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Scrolling Ticker (Marquee) */}
      <div className="bg-gray-50 border-t border-b border-gray-100 py-1.5 overflow-hidden whitespace-nowrap text-xs text-gray-600">
        <div className="inline-block animate-marquee space-x-6">
          {products.map((p) => (
            <span key={p.id} className="inline-flex items-center gap-1 mx-3">
              <span>{p.image}</span>
              <span className="font-medium text-gray-800">{p.nameBn}</span>
              <span>{enToBnNumber(p.today)} টাকা/{p.unit === "kg" ? "কেজি" : p.unit}</span>
              <span
                className={
                  p.change?.dir === "up"
                    ? "text-red-500"
                    : p.change?.dir === "down"
                    ? "text-emerald-600"
                    : "text-gray-400"
                }
              >
                {p.change?.dir === "up" ? "▲" : p.change?.dir === "down" ? "▼" : "—"} {enToBnNumber(Math.abs(p.change?.pct || 0))}%
              </span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}