import { forwardRef } from "react";
import { clsx } from "clsx";

const Input = forwardRef(
  ({ label, error, icon, iconRight, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label */}
        {label && (
          <label className="text-xs font-semibold tracking-wider text-luxe-muted uppercase">
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Icon left */}
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-luxe-muted">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            className={clsx(
              "w-full bg-luxe-input rounded-xl",
              "px-4 py-3.5 text-sm text-luxe-text",
              "placeholder:text-luxe-placeholder",
              "border border-transparent",
              "transition-all duration-200",
              "focus:outline-none focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/10",
              error &&
                "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100",
              icon && "pl-11",
              iconRight && "pr-11",
              className,
            )}
            {...props}
          />

          {/* Icon right */}
          {iconRight && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-luxe-muted">
              {iconRight}
            </span>
          )}
        </div>

        {/* Error message */}
        {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
