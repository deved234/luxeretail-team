import { Outlet, Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { ROUTES } from "../constants/routes";
import { useTheme } from "../context/ThemeContext";

export default function AuthLayout() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-luxe-bg flex flex-col">
      <header className="h-16 flex items-center justify-between px-6 lg:px-12 bg-luxe-surface border-b border-luxe-border">
        <Link
          to={ROUTES.HOME}
          className="text-xl font-bold text-luxe-text tracking-tight"
        >
          LuxeRetail
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-luxe-input transition-colors text-luxe-body"
        >
          {isDark ? (
            <Sun size={20} className="text-amber-400" />
          ) : (
            <Moon size={20} />
          )}
        </button>
      </header>

      <main className="flex-1 page-enter">
        <Outlet />
      </main>

      <footer className="py-4 px-6 border-t border-luxe-border bg-luxe-surface">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-luxe-muted">
            © 2024 LuxeRetail. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Shipping Info"].map(
              (item) => (
                <Link
                  key={item}
                  to="/"
                  className="text-xs text-luxe-muted hover:text-luxe-body transition-colors"
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
