export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col gap-2 *:rounded-md *:bg-neutral-300">
        <div className="h-4 w-1/2" />
        <div className="h-4 w-1/4" />
        <div className="h-4 w-10" />
      </div>
    </div>
  );
}