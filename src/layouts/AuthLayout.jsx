import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-luxe-bg flex flex-col">
      <header className="h-16 flex items-center px-6 lg:px-12 bg-white border-b border-luxe-border">
        <Link
          to={ROUTES.HOME}
          className="text-xl font-bold text-luxe-text tracking-tight"
        >
          LuxeRetail
        </Link>
      </header>

      <main className="flex-1 page-enter">
        <Outlet />
      </main>

      <footer className="py-4 px-6 border-t border-luxe-border bg-white">
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
