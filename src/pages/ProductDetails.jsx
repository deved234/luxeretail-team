import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  ChevronDown,
  ChevronUp,
  Shield,
  Truck,
} from "lucide-react";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { formatCurrency } from "../utils/formatCurrency";
import { ROUTES } from "../constants/routes";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Skeleton from "../components/ui/Skeleton";

// ── Skeleton ─────────────────────────────────────────────
function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <Skeleton className="w-full aspect-square" rounded="rounded-2xl" />
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-square"
                rounded="rounded-xl"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────
export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { product, isLoading, error } = useProduct(productId);
  const { addItem, isInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [specsOpen, setSpecsOpen] = useState(false);

  if (isLoading) return <ProductDetailsSkeleton />;

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-luxe-muted mb-4">Product not found.</p>
        <Button onClick={() => navigate(ROUTES.SHOP)} variant="outlined">
          Back to Shop
        </Button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addItem(product, qty, product.variant);
  };

  const handleBuyNow = () => {
    addItem(product, qty, product.variant);
    navigate(ROUTES.CART);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── Left — Image Gallery ──────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id, product.name)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Heart
                  size={18}
                  className={
                    wishlisted ? "fill-red-500 text-red-500" : "text-luxe-muted"
                  }
                />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === i
                        ? "border-brand-primary"
                        : "border-transparent hover:border-luxe-border"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right — Product Info ──────────────────── */}
          <div className="flex flex-col">
            {/* Category tag */}
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-primary mb-3">
              {product.categoryLabel}
            </span>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-bold text-luxe-text leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price + stock */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-brand-primary">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-luxe-muted line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              {product.isSale && (
                <Badge label={`${product.discount}% OFF`} variant="sale" />
              )}
              <Badge
                label={product.isInStock ? "In Stock" : "Out of Stock"}
                variant={product.isInStock ? "inStock" : "outOfStock"}
              />
            </div>

            {/* Description */}
            <p className="text-sm text-luxe-body leading-relaxed mb-6 border-b border-luxe-border pb-6">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-luxe-muted uppercase tracking-wider mb-2">
                  Color
                </p>
                <div className="flex items-center gap-2">
                  {product.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-luxe-muted uppercase tracking-wider mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-luxe-input rounded-full px-2 py-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-luxe-body hover:bg-white transition-colors font-bold text-lg"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-luxe-text">
                    {qty}
                  </span>
                  <button
                    onClick={() =>
                      setQty((q) => Math.min(product.stock, q + 1))
                    }
                    className="w-8 h-8 rounded-full flex items-center justify-center text-luxe-body hover:bg-white transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-luxe-muted">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-6">
              <Button onClick={handleBuyNow} size="lg" className="flex-1">
                Buy Now
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="outlined"
                size="lg"
                className="flex-1"
              >
                <ShoppingBag size={18} />
                {inCart ? "Added" : "Add to Cart"}
              </Button>
            </div>

            {/* Perks */}
            {product.perks?.length > 0 && (
              <div className="bg-luxe-input rounded-2xl p-4 mb-6 flex flex-col gap-3">
                {product.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {i === 0 ? (
                      <Truck
                        size={16}
                        className="text-brand-primary shrink-0"
                      />
                    ) : (
                      <Shield
                        size={16}
                        className="text-brand-primary shrink-0"
                      />
                    )}
                    <span className="text-sm text-luxe-body">{perk}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Specifications Accordion */}
            {product.specifications && (
              <div className="border border-luxe-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setSpecsOpen(!specsOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-luxe-text hover:bg-luxe-input transition-colors"
                >
                  Product Specifications
                  {specsOpen ? (
                    <ChevronUp size={18} className="text-luxe-muted" />
                  ) : (
                    <ChevronDown size={18} className="text-luxe-muted" />
                  )}
                </button>
                {specsOpen && (
                  <div className="border-t border-luxe-border divide-y divide-luxe-border">
                    {Object.entries(product.specifications).map(
                      ([key, val]) => (
                        <div key={key} className="flex px-5 py-3 gap-4">
                          <span className="text-xs font-semibold text-luxe-muted w-32 shrink-0">
                            {key}
                          </span>
                          <span className="text-xs text-luxe-body">{val}</span>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Editorial Banner ──────────────────────────── */}
      <div className="mt-16 relative overflow-hidden bg-gradient-to-r from-amber-50 to-amber-100 min-h-[300px] flex items-center justify-center">
        <div className="text-center px-8 py-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-luxe-text mb-4">
            The Art of Radiance
          </h2>
          <p className="text-sm text-luxe-muted max-w-md mx-auto mb-8 leading-relaxed">
            Discover a collection where science meets serenity, and every
            application is a moment of pure luxury designed to elevate your
            spirit.
          </p>
          <button
            onClick={() => navigate(ROUTES.SHOP)}
            className="px-8 py-3.5 border border-luxe-text text-luxe-text text-sm font-semibold rounded-full hover:bg-luxe-text hover:text-white transition-all"
          >
            Explore the Science
          </button>
        </div>
      </div>
    </div>
  );
}
