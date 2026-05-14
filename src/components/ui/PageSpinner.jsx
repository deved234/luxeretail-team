export default function PageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-luxe-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-luxe-border border-t-brand-primary animate-spin" />
        <p className="text-sm text-luxe-muted font-medium">Loading...</p>
      </div>
    </div>
  );
}
