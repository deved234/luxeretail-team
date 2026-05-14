import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag, Heart } from "lucide-react";
import { useFeaturedProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { formatCurrency } from "../utils/formatCurrency";
import { productPath, ROUTES } from "../constants/routes";
import { ProductCardSkeleton } from "../components/ui/Skeleton";
import Badge from "../components/ui/Badge";

// ── Product Card ─────────────────────────────────────────
function ProductCard({ product }) {
  const { addItem, isInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(productPath(product.id))}
    >
      {/* Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isSale && <Badge label="SALE" variant="sale" />}
          {product.isNew && <Badge label="NEW" variant="new" />}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id, product.name);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110"
        >
          <Heart
            size={15}
            className={
              wishlisted ? "fill-red-500 text-red-500" : "text-luxe-muted"
            }
          />
        </button>

        {/* Add to cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem(product, 1, product.variant);
            }}
            className="w-full bg-white/90 backdrop-blur-sm text-luxe-text text-xs font-semibold py-2.5 rounded-xl hover:bg-brand-primary hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} />
            {inCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-luxe-text leading-tight line-clamp-2 flex-1">
            {product.name}
          </h3>
          <span className="text-sm font-bold text-brand-primary shrink-0">
            {formatCurrency(product.price)}
          </span>
        </div>
        <p className="text-xs text-luxe-muted mb-2">{product.variant}</p>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {product.colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 rounded-full border border-luxe-border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1">
          <span className="text-amber-400 text-xs">★</span>
          <span className="text-xs font-medium text-luxe-text">
            {product.rating}
          </span>
          <span className="text-xs text-luxe-muted">
            ({product.reviewCount})
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────
export default function Home() {
  const { products, isLoading } = useFeaturedProducts();
  const { categories } = useCategories();
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  // فلتر المنتجات بالـ category
  const filtered =
    activeCategory === "all"
      ? products
      : products.filter(
          (p) =>
            p.tags?.includes(activeCategory.toLowerCase()) ||
            p.categoryId === activeCategory,
        );

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-600 to-slate-400 min-h-[420px] flex items-end">
          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 max-w-lg">
            <span className="text-white/60 text-xs font-medium tracking-widest uppercase mb-3 block">
              New Season 2024 Collection
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Elevate Your
              <br />
              Everyday
              <br />
              Essentials
            </h1>
            <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-sm">
              Discover a curated collection of premium apparel designed for the
              modern visionary who values timeless craftsmanship.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                to={ROUTES.SHOP}
                className="px-6 py-3 bg-white text-luxe-text text-sm font-semibold rounded-xl hover:bg-luxe-bg transition-colors"
              >
                Shop Collection
              </Link>
              <button className="px-6 py-3 border border-white/40 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors">
                View Lookbook
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-luxe-text">
            Browse Categories
          </h2>
          <Link
            to={ROUTES.SHOP}
            className="text-sm font-medium text-brand-primary flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "bg-brand-primary text-white"
                : "bg-white border border-luxe-border text-luxe-body hover:border-brand-primary hover:text-brand-primary"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.slug
                  ? "bg-brand-primary text-white"
                  : "bg-white border border-luxe-border text-luxe-body hover:border-brand-primary hover:text-brand-primary"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* ── Products ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-luxe-text">Our Products</h2>
            <p className="text-sm text-luxe-muted mt-1">
              Quality meets craftsmanship in every hand-selected piece.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {/* Discover more */}
        <div className="flex justify-center mt-10">
          <Link
            to={ROUTES.SHOP}
            className="px-8 py-3.5 border border-brand-primary text-brand-primary text-sm font-semibold rounded-xl hover:bg-brand-primary hover:text-white transition-all"
          >
            Discover More Products
          </Link>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-brand-light rounded-3xl px-8 py-14 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-5 shadow-sm">
            <span className="text-brand-primary text-xl">✉</span>
          </div>
          <h2 className="text-3xl font-bold text-luxe-text mb-3">
            Join the Luxe List
          </h2>
          <p className="text-sm text-luxe-muted max-w-md mb-8 leading-relaxed">
            Subscribe to receive exclusive early access to new collections,
            personalized style recommendations, and premium member-only
            invitations.
          </p>
          <div className="flex w-full max-w-md gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white rounded-xl px-4 py-3 text-sm text-luxe-text placeholder:text-luxe-placeholder focus:outline-none focus:ring-2 focus:ring-brand-primary/20 border border-luxe-border"
            />
            <button className="px-6 py-3 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-hover transition-colors whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
          <p className="text-xs text-luxe-muted mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of
            Service.
          </p>
        </div>
      </section>
    </div>
  );
}
