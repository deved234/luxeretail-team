import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Welcome to the Luxe List!");
    setEmail("");
  };

  const links = {
    "Quick Links": [
      { label: "New Arrivals", to: ROUTES.SHOP },
      { label: "Best Sellers", to: ROUTES.SHOP },
      { label: "Gift Cards", to: ROUTES.SHOP },
      { label: "Sale & Offers", to: ROUTES.SHOP },
    ],
    Support: [
      { label: "Shipping Policy", to: "/" },
      { label: "Returns & Exchanges", to: "/" },
      { label: "Track My Order", to: ROUTES.ORDERS },
      { label: "Contact Us", to: "/" },
    ],
    Legal: [
      { label: "Privacy Policy", to: "/" },
      { label: "Terms of Service", to: "/" },
      { label: "Cookie Policy", to: "/" },
    ],
  };

  return (
    <footer className="bg-white border-t border-luxe-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* ── Brand ──────────────────────────────────── */}
          <div className="lg:col-span-2">
            <Link
              to={ROUTES.HOME}
              className="text-xl font-bold text-luxe-text tracking-tight"
            >
              LuxeRetail
            </Link>
            <p className="mt-3 text-sm text-luxe-muted leading-relaxed max-w-xs">
              Redefining modern elegance through curated minimalist design and
              premium craftsmanship since 2024.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-luxe-muted mb-3">
                Newsletter
              </p>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 bg-luxe-input rounded-xl px-4 py-2.5 text-sm text-luxe-text placeholder:text-luxe-placeholder focus:outline-none focus:ring-2 focus:ring-brand-primary/20 border border-transparent focus:border-brand-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* ── Links ──────────────────────────────────── */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-luxe-muted mb-4">
                {title}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-luxe-body hover:text-brand-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom ─────────────────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-luxe-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-luxe-muted">
            © 2024 LuxeRetail. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-xs text-luxe-muted hover:text-luxe-body transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="text-xs text-luxe-muted hover:text-luxe-body transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
