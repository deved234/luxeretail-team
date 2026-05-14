import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Truck,
  MapPin,
  Package,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { getOrderById } from "../services/orderService";
import { formatCurrency } from "../utils/formatCurrency";
import { ROUTES } from "../constants/routes";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";

// ── Skeleton ─────────────────────────────────────────────
function OrderSuccessSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-6">
      <Skeleton className="h-40 w-full" rounded="rounded-3xl" />
      <Skeleton className="h-48 w-full" rounded="rounded-2xl" />
      <Skeleton className="h-32 w-full" rounded="rounded-2xl" />
    </div>
  );
}

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    const fetch = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch {
        navigate(ROUTES.HOME);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [orderId, navigate]);

  if (isLoading) return <OrderSuccessSkeleton />;
  if (!order) return null;

  // Format delivery dates
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-brand-success-bg via-emerald-50 to-teal-50 py-14 px-4">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          {/* Truck icon */}
          <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-5">
            <Truck size={28} className="text-brand-success" />
          </div>

          {/* Tag */}
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-success mb-3">
            Confirmation
          </span>

          {/* Title */}
          <h1 className="text-4xl font-bold text-luxe-text mb-3">
            Order Shipped
          </h1>

          {/* Description */}
          <p className="text-sm text-luxe-muted leading-relaxed max-w-md">
            Great news! Your premium selection has been carefully packaged and
            is now on its way to you. Get ready for a touch of luxury at your
            doorstep.
          </p>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-5">
        {/* Order card */}
        <div className="bg-white rounded-2xl border border-luxe-border p-6">
          {/* Order # + Delivery */}
          <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-luxe-border">
            <div>
              <p className="text-xs font-semibold text-luxe-muted uppercase tracking-wider mb-1">
                Order Number
              </p>
              <p className="text-xl font-bold text-brand-primary">
                #{order.orderNumber}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-luxe-muted uppercase tracking-wider mb-1">
                Estimated Delivery
              </p>
              <p className="text-base font-bold text-brand-success">
                {formatDate(order.estimatedDelivery.from)} –{" "}
                {formatDate(order.estimatedDelivery.to)}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-4 mb-6">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-luxe-text">
                    {item.name}
                  </p>
                  <p className="text-xs text-luxe-muted mt-0.5">
                    {item.variant}
                  </p>
                  <p className="text-xs text-luxe-muted">
                    Quantity: {item.qty}
                  </p>
                </div>
                <span className="text-sm font-bold text-luxe-text shrink-0">
                  {formatCurrency(item.price)}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-luxe-border">
            <Button variant="primary" size="md" className="gap-2">
              <Package size={16} />
              Track My Package
            </Button>
            <Link
              to={ROUTES.ORDERS}
              className="text-sm font-semibold text-brand-primary underline underline-offset-2 hover:text-brand-hover transition-colors"
            >
              View Order Receipt
            </Link>
          </div>
        </div>

        {/* Shipping + Carrier */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Shipping Address */}
          <div className="bg-white rounded-2xl border border-luxe-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-luxe-muted" />
              <p className="text-xs font-semibold uppercase tracking-wider text-luxe-muted">
                Shipping Address
              </p>
            </div>
            <p className="text-sm font-semibold text-luxe-text">
              {order.shippingAddress.fullName}
            </p>
            <p className="text-xs text-luxe-muted mt-1 leading-relaxed">
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}
              {order.shippingAddress.state &&
                `, ${order.shippingAddress.state}`}
              <br />
              {order.shippingAddress.country}
            </p>
          </div>

          {/* Carrier */}
          <div className="bg-white rounded-2xl border border-luxe-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Truck size={14} className="text-luxe-muted" />
              <p className="text-xs font-semibold uppercase tracking-wider text-luxe-muted">
                Carrier
              </p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-9 h-9 rounded-xl bg-brand-light flex items-center justify-center">
                <Truck size={16} className="text-brand-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-luxe-text">
                  {order.carrier.name}
                </p>
                <p className="text-xs text-luxe-muted">
                  {order.carrier.service}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Support */}
          <div className="bg-brand-light rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-luxe-text mb-1">
              Need assistance?
            </h3>
            <p className="text-xs text-luxe-muted leading-relaxed mb-4">
              Our dedicated support team is available 24/7 for our premium
              members.
            </p>
            <Button
              variant="outlined"
              size="sm"
              className="gap-2 w-full justify-center"
            >
              <MessageCircle size={15} />
              Chat with Support
            </Button>
          </div>

          {/* Continue shopping */}
          <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-luxe-border p-5">
            <p className="text-sm text-luxe-muted text-center">
              Looking for more inspiration?
            </p>
            <Button
              onClick={() => navigate(ROUTES.SHOP)}
              variant="outlined"
              size="md"
              className="gap-2 w-full justify-center"
            >
              Continue Shopping
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
