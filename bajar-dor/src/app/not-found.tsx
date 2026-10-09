import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-3">
      <h1 className="text-5xl font-black text-emerald-600">৪০৪</h1>
      <h2 className="text-lg font-bold text-gray-800">পেজটি খুঁজে পাওয়া যায়নি!</h2>
      <p className="text-xs text-gray-400 max-w-xs">
        আপনি যে ইউআরএলটি খুঁজছেন তা সঠিক নয় বা পেজটি সরিয়ে নেওয়া হয়েছে।
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}