export default function ResponseListSkeleton() {
  return (
    [...new Array(10)].map((v, i) => (
      <div key={i} className="relative animate-pulse">
        <div className="block border-b border-neutral-200 px-5 py-3 dark:border-[#3c4043] *:bg-neutral-300 *:rounded-full">
          <div className="flex items-center gap-2 mb-3 *:bg-neutral-300 *:rounded-full">
            <div className="w-5 h-5" />
            <div className="w-10 h-5" />
          </div>
          <div className="w-15 h-5" />
        </div>
      </div>
    ))
  );
}