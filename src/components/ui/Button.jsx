import { clsx } from "clsx";

const variants = {
  primary:
    "bg-brand-primary text-white hover:bg-brand-hover active:scale-[0.98]",
  outlined:
    "bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-light active:scale-[0.98]",
  ghost:
    "bg-transparent text-luxe-muted hover:bg-luxe-input hover:text-luxe-text active:scale-[0.98]",
  danger: "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
  full: "w-full px-6 py-3.5 text-sm",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  onClick,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        // base styles
        "inline-flex items-center justify-center gap-2",
        "font-semibold rounded-xl",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "cursor-pointer",
        // variant + size
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
