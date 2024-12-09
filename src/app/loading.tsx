export default function Loading() {
  return (
    <div className="flex flex-col gap-7 animate-pulse">
      {
        [...new Array(10)].map((_, index) => (
          <div key={index} className="flex flex-col gap-2 *:rounded-md *:bg-neutral-300">
            <div className="h-4 w-1/2" />
            <div className="h-4 w-1/4" />
            <div className="h-4 w-10" />
          </div>
        ))
      }
    </div>
  );
}