import { clsx } from "clsx";

const variants = {
  sale: "bg-brand-sale text-white",
  new: "bg-brand-primary text-white",
  inStock: "bg-brand-success-bg text-brand-success",
  outOfStock: "bg-red-100 text-red-600",
  shipped: "bg-brand-light text-brand-primary",
  pending: "bg-amber-100 text-amber-700",
  delivered: "bg-brand-success-bg text-brand-success",
  cancelled: "bg-red-100 text-red-600",
};

export default function Badge({ label, variant = "new", className = "" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-1",
        "text-xs font-semibold rounded-full",
        "tracking-wide whitespace-nowrap",
        variants[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
