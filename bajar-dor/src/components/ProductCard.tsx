import Link from "next/link";
import { enToBnNumber } from "@/lib/utils";

export default function ProductCard({ product }: { product: any }) {
  const unitMap: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition block"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl">
          {product.image}
        </div>
        <div>
          <h3 className="font-bold text-sm text-gray-800">{product.nameBn}</h3>
          <p className="text-xs text-gray-400">{unitMap[product.unit] || `প্রতি ${product.unit}`}</p>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-gray-50 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-gray-400 block">আজকের দাম</span>
          <span className="text-base font-extrabold text-gray-900">
            {enToBnNumber(product.today)} টাকা
          </span>
        </div>
        <div
          className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
              ? "bg-emerald-50 text-emerald-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{enToBnNumber(Math.abs(product.change?.pct || 0))}%</span>
        </div>
      </div>
    </Link>
  );
}