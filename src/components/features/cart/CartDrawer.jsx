import { useNavigate } from "react-router-dom";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useUIStore } from "../../../store/useUIStore";
import { useCart } from "../../../hooks/useCart";
import { formatCurrency } from "../../../utils/formatCurrency";
import { productPath, ROUTES } from "../../../constants/routes";
import Button from "../../ui/Button";

// ── Drawer Item ──────────────────────────────────────────
function DrawerItem({ item }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex gap-3 py-4 border-b border-luxe-border last:border-0">
      {/* Image */}
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-luxe-text leading-tight line-clamp-1">
          {item.name}
        </p>
        <p className="text-xs text-luxe-muted mt-0.5 mb-2">{item.variant}</p>

        <div className="flex items-center justify-between">
          {/* Qty stepper */}
          <div className="flex items-center bg-luxe-input rounded-full px-1 py-0.5">
            <button
              onClick={() => updateQty(item.id, item.variant, item.qty - 1)}
              disabled={item.qty <= 1}
              className="w-6 h-6 rounded-full flex items-center justify-center text-luxe-body hover:bg-white transition-colors disabled:opacity-40 font-bold text-sm"
            >
              −
            </button>
            <span className="w-7 text-center text-xs font-semibold text-luxe-text">
              {item.qty}
            </span>
            <button
              onClick={() => updateQty(item.id, item.variant, item.qty + 1)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-luxe-body hover:bg-white transition-colors font-bold text-sm"
            >
              +
            </button>
          </div>

          {/* Price + Remove */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-luxe-text">
              {formatCurrency(item.price * item.qty)}
            </span>
            <button
              onClick={() => removeItem(item.id, item.variant, item.name)}
              className="text-luxe-muted hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Drawer ──────────────────────────────────────────
export default function CartDrawer() {
  const navigate = useNavigate();
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
  const { items, totalItems, totalPrice, grandTotal } = useCart();

  const handleViewCart = () => {
    closeCartDrawer();
    navigate(ROUTES.CART);
  };

  const handleCheckout = () => {
    closeCartDrawer();
    navigate(ROUTES.CHECKOUT);
  };

  return (
    <>
      {/* ── Backdrop ───────────────────────────────────── */}
      {isCartDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={closeCartDrawer}
        />
      )}

      {/* ── Drawer ─────────────────────────────────────── */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-[0_0_40px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-300 ease-in-out ${
          isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-luxe-border">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-luxe-text" />
            <h2 className="text-base font-semibold text-luxe-text">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCartDrawer}
            className="p-2 rounded-full hover:bg-luxe-input transition-colors text-luxe-muted"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-14 h-14 rounded-full bg-brand-light flex items-center justify-center mb-4">
                <ShoppingBag size={24} className="text-brand-primary" />
              </div>
              <p className="text-sm font-semibold text-luxe-text mb-1">
                Your cart is empty
              </p>
              <p className="text-xs text-luxe-muted mb-6">
                Add items to get started
              </p>
              <Button
                onClick={() => {
                  closeCartDrawer();
                  navigate(ROUTES.SHOP);
                }}
                variant="outlined"
                size="sm"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <DrawerItem key={`${item.id}-${item.variant}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-luxe-border px-5 py-5 flex flex-col gap-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-luxe-muted">Subtotal</span>
              <span className="text-sm font-medium text-luxe-text">
                {formatCurrency(totalPrice)}
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-bold text-luxe-text">Total</span>
              <span className="text-lg font-bold text-brand-primary">
                {formatCurrency(grandTotal)}
              </span>
            </div>

            {/* CTAs */}
            <Button size="full" onClick={handleCheckout} className="gap-2">
              Checkout
              <ArrowRight size={16} />
            </Button>
            <Button size="full" variant="outlined" onClick={handleViewCart}>
              View Cart
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
