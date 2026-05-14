import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/formatCurrency";
import { productPath } from "../constants/routes";
import EmptyState from "../components/ui/EmptyState";
import { ProductCardSkeleton } from "../components/ui/Skeleton";

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, isLoading: wLoading, toggleWishlist } = useWishlist();
  const { products, isLoading: pLoading } = useProducts();
  const { addItem } = useCart();

  const isLoading = wLoading || pLoading;

  // جيب المنتجات الموجودة في الـ wishlist بس
  const wishlistProducts = products.filter((p) =>
    wishlist.some((w) => w.productId === p.id),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-luxe-text">My Wishlist</h1>
        {wishlistProducts.length > 0 && (
          <p className="text-sm text-luxe-muted">
            {wishlistProducts.length} saved items
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : wishlistProducts.length === 0 ? (
        <EmptyState
          icon={<Heart size={28} />}
          title="Your wishlist is empty"
          message="Save items you love and find them here whenever you're ready."
          actionLabel="Explore Products"
          onAction={() => navigate("/shop")}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => navigate(productPath(product.id))}
            >
              {/* Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Remove from wishlist */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id, product.name);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Heart size={15} className="fill-red-500 text-red-500" />
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
                    Add to Cart
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
                <p className="text-xs text-luxe-muted">{product.variant}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
