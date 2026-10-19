export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#f5efe4] text-[#291412]">
      {/* HEADER SKELETON */}
      <header className="relative overflow-hidden bg-[#300604] py-5 px-5 md:px-8 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full border border-[#cda456]/30 bg-[#420b08] animate-pulse flex items-center justify-center text-[#e4c57d]">
              ✦
            </div>
            <div className="space-y-1.5">
              <div className="h-4 w-32 rounded bg-[#4a120e] animate-pulse" />
              <div className="h-2.5 w-44 rounded bg-[#4a120e]/60 animate-pulse" />
            </div>
          </div>
          <div className="h-9 w-24 rounded-full bg-[#4a120e] animate-pulse" />
        </div>
      </header>

      {/* BODY SKELETON */}
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 space-y-6">
        <div className="space-y-2">
          <div className="h-3 w-28 rounded bg-[#ddcfbb] animate-pulse" />
          <div className="h-8 w-64 rounded bg-[#d5c3aa] animate-pulse" />
          <div className="h-4 w-96 max-w-full rounded bg-[#e0d4c3] animate-pulse" />
        </div>

        {/* Content Box Skeleton */}
        <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-sm text-[#8c7462]">
            <span className="inline-block animate-spin text-lg">✦</span>
            <span>कृपया प्रतीक्षा करें, पृष्ठ लोड हो रहा है... (Loading Admin Content...)</span>
          </div>
          <div className="space-y-4 pt-4 border-t border-[#ede0d0]">
            <div className="h-10 w-full rounded-xl bg-[#f4ecd9] animate-pulse" />
            <div className="h-28 w-full rounded-2xl bg-[#f4ecd9] animate-pulse" />
            <div className="h-10 w-48 rounded-xl bg-[#e8dac0] animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
