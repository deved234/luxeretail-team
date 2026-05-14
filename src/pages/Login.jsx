import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { loginSchema } from "../validation/authSchema";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => login(data);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* ── Left Panel ───────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-500 to-rose-300" />

        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div>
            <span className="text-xl font-bold text-white tracking-tight">
              LuxeRetail
            </span>
          </div>

          {/* Tagline */}
          <div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-4">
              Elevate Your
              <br />
              Experience.
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              Welcome to a world of curated luxury and effortless discovery.
              Sign in to continue your journey through our exclusive collection.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Panel ──────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-luxe-surface">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-brand-primary mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-luxe-muted">
              Please enter your credentials to access your account.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder="Email Address"
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                error={errors.password?.message}
                iconRight={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-luxe-muted hover:text-luxe-text transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
                {...register("password")}
              />

              {/* Forgot password */}
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  className="text-xs font-semibold tracking-wider uppercase text-brand-primary hover:text-brand-hover transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="full"
              isLoading={isLoading}
              className="mt-2 gap-3"
            >
              Sign In
              {!isLoading && <ArrowRight size={18} />}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-luxe-border" />
              <span className="text-xs text-luxe-muted font-medium">OR</span>
              <div className="flex-1 h-px bg-luxe-border" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-luxe-border hover:bg-luxe-input transition-colors text-sm font-medium text-luxe-body"
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path
                    fill="#4285F4"
                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                  />
                  <path
                    fill="#34A853"
                    d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.548 0 9s.348 2.825.957 4.039l3.007-2.332z"
                  />
                  <path
                    fill="#EA4335"
                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-luxe-border hover:bg-luxe-input transition-colors text-sm font-medium text-luxe-body"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="currentColor"
                >
                  <path d="M12.525 1c.096 1.188-.34 2.354-1.007 3.196-.674.851-1.755 1.517-2.836 1.438-.12-1.137.394-2.33 1.02-3.094C10.366 1.67 11.5 1.02 12.525 1zM16 12.696c-.42.96-.621 1.388-1.162 2.235-.753 1.148-1.816 2.577-3.135 2.588-1.17.01-1.471-.762-3.059-.753-1.588.009-1.92.766-3.092.754-1.318-.013-2.322-1.3-3.076-2.449C.686 12.734.125 9.48.962 7.336c.6-1.544 1.946-2.592 3.372-2.592 1.254 0 2.046.762 3.085.762 1.007 0 1.62-.764 3.072-.764 1.296 0 2.474.893 3.072 2.165-2.698 1.478-2.261 5.333.437 5.789z" />
                </svg>
                Apple
              </button>
            </div>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-luxe-muted mt-8">
            Don't have an account?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="font-semibold text-brand-primary hover:text-brand-hover transition-colors"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
