import Button from "./Button";

export default function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {icon && (
        <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mb-4 text-brand-primary">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-luxe-text mb-2">{title}</h3>
      <p className="text-sm text-luxe-muted max-w-sm mb-6">{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outlined">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
