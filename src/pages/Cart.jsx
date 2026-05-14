import { useNavigate, Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Shield,
  Truck,
  Lock,
  Tag,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useFeaturedProducts } from "../hooks/useProducts";
import { useAuthStore } from "../store/useAuthStore";
import { formatCurrency } from "../utils/formatCurrency";
import { productPath, ROUTES } from "../constants/routes";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

// ── Cart Item ────────────────────────────────────────────
function CartItem({ item }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-6 border-b border-luxe-border last:border-0">
      {/* Image */}
      <Link to={productPath(item.id)} className="shrink-0">
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link to={productPath(item.id)}>
              <h3 className="text-sm font-semibold text-luxe-text hover:text-brand-primary transition-colors leading-tight">
                {item.name}
              </h3>
            </Link>
            <p className="text-xs text-luxe-muted mt-0.5">{item.variant}</p>
          </div>
          <span className="text-sm font-bold text-luxe-text shrink-0">
            {formatCurrency(item.price)}
          </span>
        </div>

        {/* Qty + Remove */}
        <div className="flex items-center justify-between mt-4">
          {/* Qty stepper */}
          <div className="flex items-center bg-luxe-input rounded-full px-1.5 py-1">
            <button
              onClick={() => updateQty(item.id, item.variant, item.qty - 1)}
              disabled={item.qty <= 1}
              className="w-7 h-7 rounded-full flex items-center justify-center text-luxe-body hover:bg-white transition-colors disabled:opacity-40 font-bold"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-semibold text-luxe-text">
              {item.qty}
            </span>
            <button
              onClick={() => updateQty(item.id, item.variant, item.qty + 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-luxe-body hover:bg-white transition-colors font-bold"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.id, item.variant, item.name)}
            className="flex items-center gap-1.5 text-xs text-luxe-muted hover:text-red-500 transition-colors"
          >
            <Trash2 size={14} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Order Summary ────────────────────────────────────────
function OrderSummary({ totalPrice, shippingFee, tax, grandTotal }) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, {
        state: { from: { pathname: ROUTES.CHECKOUT } },
      });
    } else {
      navigate(ROUTES.CHECKOUT);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-luxe-border p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-luxe-text mb-4 pb-4 border-b border-luxe-border">
        Order Summary
      </h2>

      {/* Rows */}
      <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-luxe-border">
        <div className="flex justify-between text-sm">
          <span className="text-luxe-muted">Subtotal</span>
          <span className="font-medium text-luxe-text">
            {formatCurrency(totalPrice)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-luxe-muted">Estimated Shipping</span>
          <span className="font-medium text-brand-success">
            {shippingFee === 0 ? "$0.00" : formatCurrency(shippingFee)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-luxe-muted">Tax</span>
          <span className="font-medium text-luxe-text">
            {formatCurrency(tax)}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-base font-bold text-luxe-text">Total</span>
          <p className="text-xs text-luxe-muted">Including VAT</p>
        </div>
        <span className="text-2xl font-bold text-brand-primary">
          {formatCurrency(grandTotal)}
        </span>
      </div>

      {/* Checkout CTA */}
      <Button size="full" onClick={handleCheckout} className="mb-4">
        Proceed to Checkout
        <ArrowRight size={18} />
      </Button>

      {/* Promo code */}
      <div className="flex items-center justify-between p-3.5 bg-luxe-input rounded-xl mb-6 cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-brand-primary" />
          <div>
            <p className="text-xs font-semibold text-luxe-text">
              Apply Promo Code
            </p>
            <p className="text-xs text-luxe-muted">LUXE MEMBERS GET 10% OFF</p>
          </div>
        </div>
        <ArrowRight size={16} className="text-luxe-muted" />
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { icon: <Shield size={18} />, label: "2-Year Warranty" },
          { icon: <Truck size={18} />, label: "Free Shipping" },
          { icon: <Lock size={18} />, label: "Secure SSL" },
        ].map((badge) => (
          <div
            key={badge.label}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <div className="text-luxe-muted">{badge.icon}</div>
            <span className="text-[10px] text-luxe-muted leading-tight">
              {badge.label}
            </span>
          </div>
        ))}
      </div>

      {/* Support */}
      <p className="text-center text-xs text-luxe-muted">
        Need help?{" "}
        <span className="text-brand-primary font-medium cursor-pointer hover:underline">
          Contact Support
        </span>
      </p>
    </div>
  );
}

// ── Complete The Look ────────────────────────────────────
function CompleteTheLook() {
  const { products } = useFeaturedProducts();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const suggestions = products.slice(0, 4);

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold tracking-widest uppercase text-luxe-muted">
          Complete The Look
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {suggestions.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer group"
            onClick={() => navigate(productPath(product.id))}
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-2">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-xs font-semibold text-luxe-text line-clamp-1">
              {product.name}
            </p>
            <p className="text-xs font-bold text-brand-primary mt-0.5">
              {formatCurrency(product.price)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────
export default function Cart() {
  const { items, totalPrice, shippingFee, tax, grandTotal } = useCart();
  const navigate = useNavigate();

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-luxe-text mb-8">Your Cart</h1>
        <EmptyState
          icon={<ShoppingBag size={28} />}
          title="Your cart is empty"
          message="Looks like you haven't added anything yet. Explore our collection and find something you love."
          actionLabel="Continue Shopping"
          onAction={() => navigate(ROUTES.SHOP)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-luxe-text">Your Cart</h1>
        <p className="text-sm text-luxe-muted">
          {items.reduce((s, i) => s + i.qty, 0)} items in your bag
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Left — Items */}
        <div>
          <div className="bg-white rounded-2xl border border-luxe-border px-6">
            {items.map((item) => (
              <CartItem key={`${item.id}-${item.variant}`} item={item} />
            ))}
          </div>

          {/* Complete the look */}
          <CompleteTheLook />
        </div>

        {/* Right — Summary */}
        <OrderSummary
          totalPrice={totalPrice}
          shippingFee={shippingFee}
          tax={tax}
          grandTotal={grandTotal}
        />
      </div>
    </div>
  );
}
