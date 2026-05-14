import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function PublicRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // لو اتسجل دخول مسبقاً متسمحلوش يرجع للـ login أو register
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
