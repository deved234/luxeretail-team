import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { getOrdersByUser } from "../services/orderService";
import { useAuthStore } from "../store/useAuthStore";
import { formatCurrency } from "../utils/formatCurrency";
import { orderSuccessPath } from "../constants/routes";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "../constants/config";
import EmptyState from "../components/ui/EmptyState";
import Skeleton from "../components/ui/Skeleton";

function OrderCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-luxe-border p-6 flex flex-col gap-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}

export default function Orders() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      try {
        const data = await getOrdersByUser(user.id);
        setOrders(data.reverse());
      } catch {
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-luxe-text mb-8">My Orders</h1>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={28} />}
          title="No orders yet"
          message="You haven't placed any orders yet. Start shopping and your orders will appear here."
          actionLabel="Start Shopping"
          onAction={() => navigate("/shop")}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => navigate(orderSuccessPath(order.id))}
              className="bg-white rounded-2xl border border-luxe-border p-6 cursor-pointer hover:border-brand-primary hover:shadow-[0_4px_16px_rgba(59,79,204,0.10)] transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-luxe-muted mb-1">Order Number</p>
                  <p className="text-base font-bold text-brand-primary">
                    #{order.orderNumber}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${ORDER_STATUS_COLORS[order.status]}`}
                  >
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                  <ChevronRight
                    size={18}
                    className="text-luxe-muted group-hover:text-brand-primary transition-colors"
                  />
                </div>
              </div>

              {/* Items preview */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-2">
                  {order.items.slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white bg-gray-50"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-luxe-text">
                    {order.items[0].name}
                    {order.items.length > 1 && (
                      <span className="text-luxe-muted font-normal">
                        {" "}
                        +{order.items.length - 1} more
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-luxe-muted">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-luxe-border">
                <p className="text-xs text-luxe-muted">
                  {order.items.reduce((s, i) => s + i.qty, 0)} items
                </p>
                <p className="text-sm font-bold text-luxe-text">
                  {formatCurrency(order.total)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
