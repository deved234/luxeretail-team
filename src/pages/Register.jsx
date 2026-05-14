import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { registerSchema } from "../validation/authSchema";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Register() {
  const { register: registerUser, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { terms: false },
  });

  const onSubmit = (data) => registerUser(data);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* ── Left Panel ───────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-600 to-slate-400" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <span className="text-xl font-bold text-white tracking-tight">
              LuxeRetail
            </span>
          </div>

          <div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-4">
              Elevate Your
              <br />
              Lifestyle.
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-sm mb-8">
              Join our exclusive community of curators and enthusiasts. Discover
              a world of refined taste and timeless design.
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#8B7EC8", "#A78BCA", "#C4A8D4"].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-white/80 text-sm">Joined by 10k+ curators</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ──────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-luxe-surface">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-brand-primary mb-2">
              Create Account
            </h2>
            <p className="text-sm text-luxe-muted">
              Start your journey with LuxeRetail today.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Full Name */}
            <Input
              label="Full Name"
              type="text"
              placeholder="Jane Doe"
              error={errors.name?.message}
              {...register("name")}
            />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder="jane@example.com"
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Password row */}
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                error={errors.password?.message}
                iconRight={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-luxe-muted hover:text-luxe-text transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                {...register("password")}
              />
              <Input
                label="Confirm"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                iconRight={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-luxe-muted hover:text-luxe-text transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                }
                {...register("confirmPassword")}
              />
            </div>

            {/* Terms checkbox */}
            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-luxe-border text-brand-primary accent-brand-primary cursor-pointer"
                  {...register("terms")}
                />
                <span className="text-sm text-luxe-muted leading-relaxed">
                  I agree to the{" "}
                  <Link
                    to="/"
                    className="text-brand-primary font-medium hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/"
                    className="text-brand-primary font-medium hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-500 ml-7">
                  {errors.terms.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="full"
              isLoading={isLoading}
              className="mt-2"
            >
              Register
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-luxe-muted mt-8">
            Already have an account?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="font-semibold text-brand-primary hover:text-brand-hover transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
