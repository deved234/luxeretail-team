import { clsx } from "clsx";

export default function Card({
  children,
  className = "",
  hoverable = false,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-luxe-surface rounded-2xl border border-luxe-border",
        "shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
        hoverable && [
          "cursor-pointer transition-all duration-300",
          "hover:shadow-[0_4px_16px_rgba(59,79,204,0.14)]",
          "hover:-translate-y-0.5",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
