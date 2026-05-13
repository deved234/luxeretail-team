import { clsx } from "clsx";

export default function Skeleton({ className = "", rounded = "rounded-lg" }) {
  return <div className={clsx("skeleton", rounded, className)} />;
}

// Product Card Skeleton جاهز للاستخدام في الـ grid
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-full aspect-square" rounded="rounded-2xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
}
