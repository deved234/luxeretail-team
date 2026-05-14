import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import PageSpinner from "../components/ui/PageSpinner";
import { ROUTES } from "../constants/routes";

// ── Lazy load كل صفحة ──────────────────────────────────
const Home = lazy(() => import("../pages/Home"));
const Shop = lazy(() => import("../pages/Shop"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess"));
const Orders = lazy(() => import("../pages/Orders"));
const Profile = lazy(() => import("../pages/Profile"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));

// ── Suspense wrapper ────────────────────────────────────
const Lazy = ({ children }) => (
  <Suspense fallback={<PageSpinner />}>{children}</Suspense>
);

// ── Router Definition ───────────────────────────────────
const router = createBrowserRouter([
  // ── App routes (مع Navbar و Footer) ──────────────────
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Lazy>
            <Home />
          </Lazy>
        ),
      },
      {
        path: ROUTES.SHOP,
        element: (
          <Lazy>
            <Shop />
          </Lazy>
        ),
      },
      {
        path: ROUTES.PRODUCT,
        element: (
          <Lazy>
            <ProductDetails />
          </Lazy>
        ),
      },
      {
        path: ROUTES.CART,
        element: (
          <Lazy>
            <Cart />
          </Lazy>
        ),
      },

      // ── Protected routes (محتاج login) ───────────────
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.CHECKOUT,
            element: (
              <Lazy>
                <Checkout />
              </Lazy>
            ),
          },
          {
            path: ROUTES.ORDER_SUCCESS,
            element: (
              <Lazy>
                <OrderSuccess />
              </Lazy>
            ),
          },
          {
            path: ROUTES.ORDERS,
            element: (
              <Lazy>
                <Orders />
              </Lazy>
            ),
          },
          {
            path: ROUTES.PROFILE,
            element: (
              <Lazy>
                <Profile />
              </Lazy>
            ),
          },
          {
            path: ROUTES.WISHLIST,
            element: (
              <Lazy>
                <Wishlist />
              </Lazy>
            ),
          },
        ],
      },
    ],
  },

  // ── Auth routes (بدون Navbar — AuthLayout) ────────────
  {
    element: <AuthLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: (
              <Lazy>
                <Login />
              </Lazy>
            ),
          },
          {
            path: ROUTES.REGISTER,
            element: (
              <Lazy>
                <Register />
              </Lazy>
            ),
          },
        ],
      },
    ],
  },

  // ── 404 ──────────────────────────────────────────────
  {
    path: ROUTES.NOT_FOUND,
    element: (
      <Lazy>
        <NotFound />
      </Lazy>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
