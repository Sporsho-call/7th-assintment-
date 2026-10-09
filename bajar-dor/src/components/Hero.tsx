export default function Hero() {
  return (
    <div className="bg-emerald-50/50 rounded-2xl p-6 sm:p-10 my-6 border border-emerald-100/60 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="space-y-3 max-w-lg">
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
          মঙ্গলবার, ৬ অক্টোবর, ২০২৬
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a
          href="#সব-পণ্য"
          className="inline-block text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg transition"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      {/* Hero Illustration Image directly from public folder */}
      <div className="w-48 sm:w-60 h-auto flex items-center justify-center">
        <img
          src="/bazar-hero.png"
          alt="বাজার দর বাসকেট"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}