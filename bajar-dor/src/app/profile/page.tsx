"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();

  if (!session) {
    return <div className="text-center py-12 text-sm text-gray-500">অনুগ্রহ করে সাইন ইন করুন।</div>;
  }

  return (
    <div className="max-w-md mx-auto my-8 px-4 space-y-4">
      <h1 className="text-xl font-bold text-gray-900">আমার প্রোফাইল</h1>
      <p className="text-xs text-gray-400">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-600 text-white text-xl rounded-full flex items-center justify-center font-bold">
            {session.user.name?.[0] || "U"}
          </div>
          <div>
            <h2 className="font-bold text-sm text-gray-800">{session.user.name}</h2>
            <p className="text-xs text-gray-400">{session.user.email}</p>
          </div>
        </div>

        {/* Challenge C3: Navigate to update page */}
        <Link
          href="/profile/update"
          className="text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}