import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield, Truck, CreditCard, Banknote } from "lucide-react";
import { checkoutSchema } from "../validation/checkoutSchema";
import { useCart } from "../hooks/useCart";
import { useAuthStore } from "../store/useAuthStore";
import { createOrder } from "../services/orderService";
import { generateOrderNumber } from "../utils/generateOrderId";
import { formatCurrency } from "../utils/formatCurrency";
import { orderSuccessPath } from "../constants/routes";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { toast } from "react-hot-toast";

// ── Section Title ────────────────────────────────────────
function SectionTitle({ number, title }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-7 h-7 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
        {number}
      </div>
      <h2 className="text-base font-semibold text-luxe-text">{title}</h2>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────
export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, totalPrice, shippingFee, tax, grandTotal, clearCart } =
    useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.address?.fullName || user?.name || "",
      email: user?.email || "",
      phone: user?.address?.phone || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zip: user?.address?.zip || "",
      country: user?.address?.country || "",
      paymentMethod: "COD",
    },
  });

  const onSubmit = async (data) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setIsSubmitting(true);

      const order = {
        orderNumber: generateOrderNumber(),
        userId: user.id,
        items: items.map((i) => ({
          productId: i.id,
          name: i.name,
          variant: i.variant,
          qty: i.qty,
          price: i.price,
          image: i.image,
        })),
        shippingAddress: {
          fullName: data.fullName,
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
        },
        carrier: {
          name: "LuxeExpress Prime",
          service: "Standard Air Freight",
        },
        paymentMethod: paymentMethod,
        subtotal: totalPrice,
        shippingFee: shippingFee,
        tax: tax,
        total: grandTotal,
        status: "processing",
        estimatedDelivery: {
          from: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          to: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        },
        createdAt: new Date().toISOString(),
      };

      const created = await createOrder(order);
      clearCart();
      navigate(orderSuccessPath(created.id));
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-luxe-text mb-8">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* ── Left — Form ──────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Shipping */}
            <div className="bg-white rounded-2xl border border-luxe-border p-6">
              <SectionTitle number="1" title="Shipping Information" />
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Jane Doe"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="jane@example.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
                <Input
                  label="Street Address"
                  placeholder="123 Luxury Lane"
                  error={errors.street?.message}
                  {...register("street")}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="Manhattan"
                    error={errors.city?.message}
                    {...register("city")}
                  />
                  <Input
                    label="State / Province"
                    placeholder="NY"
                    error={errors.state?.message}
                    {...register("state")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="ZIP / Postal Code"
                    placeholder="10012"
                    error={errors.zip?.message}
                    {...register("zip")}
                  />
                  <Input
                    label="Country"
                    placeholder="United States"
                    error={errors.country?.message}
                    {...register("country")}
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-luxe-border p-6">
              <SectionTitle number="2" title="Payment Method" />
              <div className="flex flex-col gap-3">
                {/* COD */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "COD"
                      ? "border-brand-primary bg-brand-light"
                      : "border-luxe-border hover:border-brand-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="accent-brand-primary"
                  />
                  <Banknote size={20} className="text-brand-primary shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-luxe-text">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-luxe-muted">
                      Pay when your order arrives
                    </p>
                  </div>
                </label>

                {/* Card */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-brand-primary bg-brand-light"
                      : "border-luxe-border hover:border-brand-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="accent-brand-primary"
                  />
                  <CreditCard
                    size={20}
                    className="text-brand-primary shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-luxe-text">
                      Credit / Debit Card
                    </p>
                    <p className="text-xs text-luxe-muted">
                      Visa, Mastercard, Amex
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* ── Right — Summary ───────────────────────── */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-luxe-border p-6 sticky top-24">
              <h2 className="text-base font-semibold text-luxe-text mb-4 pb-4 border-b border-luxe-border">
                Order Summary
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-luxe-border max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.variant}`}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-luxe-text truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-luxe-muted">Qty: {item.qty}</p>
                    </div>
                    <span className="text-xs font-semibold text-luxe-text shrink-0">
                      {formatCurrency(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-2.5 mb-4 pb-4 border-b border-luxe-border">
                <div className="flex justify-between text-sm">
                  <span className="text-luxe-muted">Subtotal</span>
                  <span className="font-medium">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-luxe-muted">Shipping</span>
                  <span className="font-medium text-brand-success">
                    {shippingFee === 0 ? "Free" : formatCurrency(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-luxe-muted">Tax</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-luxe-text">Total</span>
                <span className="text-xl font-bold text-brand-primary">
                  {formatCurrency(grandTotal)}
                </span>
              </div>

              {/* Submit */}
              <Button type="submit" size="full" isLoading={isSubmitting}>
                Place Order
              </Button>

              {/* Trust */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <Shield size={14} className="text-luxe-muted" />
                <p className="text-xs text-luxe-muted text-center">
                  Your information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
