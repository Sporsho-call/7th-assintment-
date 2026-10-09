export default function SkeletonCard() {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
        <div className="space-y-1.5 flex-1">
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="h-2 bg-gray-100 rounded w-1/3"></div>
        </div>
      </div>
      <div className="pt-2 border-t border-gray-50 flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
      </div>
    </div>
  );
}