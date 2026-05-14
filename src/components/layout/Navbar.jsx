import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { ROUTES } from "../../constants/routes";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";
import { useUIStore } from "../../store/useUIStore";
import { useAuth } from "../../hooks/useAuth";
import { clsx } from "clsx";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { logout } = useAuth();
  const { openCartDrawer } = useUIStore();
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "Home", to: ROUTES.HOME },
    { label: "Shop", to: ROUTES.SHOP },
    { label: "Collections", to: ROUTES.SHOP },
    { label: "About", to: "/" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`${ROUTES.SHOP}?q=${searchQuery}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-40 bg-luxe-surface border-b border-luxe-border">
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ─────────────────────────────────── */}
          <Link
            to={ROUTES.HOME}
            className="text-xl font-bold text-luxe-text tracking-tight shrink-0"
          >
            LuxeRetail
          </Link>

          {/* ── Nav Links (desktop) ───────────────────── */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  clsx(
                    "text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-brand-primary"
                      : "text-luxe-body hover:text-luxe-text",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ── Actions ──────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-luxe-input transition-colors text-luxe-body"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun size={20} className="text-amber-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-luxe-input transition-colors text-luxe-body"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                to={ROUTES.WISHLIST}
                className="p-2 rounded-full hover:bg-luxe-input transition-colors text-luxe-body"
              >
                <Heart size={20} />
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={openCartDrawer}
              className="relative p-2 rounded-full hover:bg-luxe-input transition-colors text-luxe-body"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-luxe-input transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-light flex items-center justify-center">
                    <span className="text-xs font-bold text-brand-primary">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-12 z-20 w-48 bg-luxe-surface rounded-2xl border border-luxe-border shadow-[0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden">
                      <div className="px-4 py-3 border-b border-luxe-border">
                        <p className="text-sm font-semibold text-luxe-text truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-luxe-muted truncate">
                          {user?.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to={ROUTES.PROFILE}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-luxe-body hover:bg-luxe-input transition-colors"
                        >
                          <User size={16} />
                          Profile
                        </Link>
                        <Link
                          to={ROUTES.ORDERS}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-luxe-body hover:bg-luxe-input transition-colors"
                        >
                          <ShoppingBag size={16} />
                          My Orders
                        </Link>
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="hidden sm:block text-sm font-medium text-luxe-body hover:text-luxe-text transition-colors px-3 py-2"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full hover:bg-luxe-input transition-colors text-luxe-body"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Search Bar ───────────────────────────────── */}
        {searchOpen && (
          <div className="py-3 border-t border-luxe-border">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-luxe-muted"
                />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-luxe-input rounded-full pl-11 pr-4 py-2.5 text-sm text-luxe-text placeholder:text-luxe-placeholder focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                />
              </div>
            </form>
          </div>
        )}

        {/* ── Mobile Menu ──────────────────────────────── */}
        {mobileOpen && (
           <div className="md:hidden border-t border-luxe-border py-4 flex flex-col gap-1 bg-luxe-surface">

            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-light text-brand-primary"
                      : "text-luxe-body hover:bg-luxe-input",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            {!isAuthenticated && (
              <Link
                to={ROUTES.LOGIN}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-brand-primary"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
