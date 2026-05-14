import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Heart, ShoppingBag } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useDebounce } from "../hooks/useDebounce";
import { formatCurrency } from "../utils/formatCurrency";
import { productPath } from "../constants/routes";
import { ProductCardSkeleton } from "../components/ui/Skeleton";
import { SORT_OPTIONS } from "../constants/config";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";

// ── Product Card ─────────────────────────────────────────
function ProductCard({ product }) {
  const { addItem, isInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(productPath(product.id))}
    >
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

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id, product.name);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart
            size={15}
            className={
              isWishlisted(product.id)
                ? "fill-red-500 text-red-500"
                : "text-luxe-muted"
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
            {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

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
export default function Shop() {
  const [searchParams] = useSearchParams();
  const { categories } = useCategories();
  const { products, isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt_desc");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const debouncedSearch = useDebounce(searchQuery, 350);

  // فلترة وسورت كلها على الـ frontend
  const filtered = useMemo(() => {
    let result = [...products];

    // فلتر بالـ category
    if (activeCategory !== "all") {
      result = result.filter(
        (p) =>
          p.categoryId === activeCategory || p.tags?.includes(activeCategory),
      );
    }

    // فلتر بالـ search
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.includes(q)),
      );
    }

    // فلتر بالـ price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // سورت
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating_desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [products, activeCategory, debouncedSearch, sortBy, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Header ───────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-luxe-text mb-1">Shop</h1>
        <p className="text-sm text-luxe-muted">
          {filtered.length} products found
        </p>
      </div>

      {/* ── Search + Controls ────────────────────────── */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-luxe-input rounded-xl px-4 py-2.5 text-sm text-luxe-text placeholder:text-luxe-placeholder focus:outline-none focus:ring-2 focus:ring-brand-primary/20 border border-transparent focus:border-brand-primary"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white border border-luxe-border rounded-xl px-4 py-2.5 text-sm text-luxe-body focus:outline-none focus:ring-2 focus:ring-brand-primary/20 cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Filters toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
            showFilters
              ? "bg-brand-primary text-white border-brand-primary"
              : "bg-white text-luxe-body border-luxe-border hover:border-brand-primary"
          }`}
        >
          <SlidersHorizontal size={16} />
          Advanced Filters
        </button>
      </div>

      {/* ── Advanced Filters Panel ───────────────────── */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-luxe-border p-6 mb-6">
          <h3 className="text-sm font-semibold text-luxe-text mb-4">
            Price Range
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-luxe-muted w-16">
              {formatCurrency(priceRange[0])}
            </span>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="flex-1 accent-brand-primary"
            />
            <span className="text-sm text-luxe-muted w-16 text-right">
              {formatCurrency(priceRange[1])}
            </span>
          </div>
        </div>
      )}

      {/* ── Category Pills ───────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
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
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? "bg-brand-primary text-white"
                : "bg-white border border-luxe-border text-luxe-body hover:border-brand-primary hover:text-brand-primary"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ── Products Grid ────────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={28} />}
          title="No products found"
          message="Try adjusting your filters or search query."
          actionLabel="Clear Filters"
          onAction={() => {
            setActiveCategory("all");
            setSearchQuery("");
            setPriceRange([0, 1000]);
          }}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
