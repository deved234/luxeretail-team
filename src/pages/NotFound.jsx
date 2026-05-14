import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Button from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-luxe-bg flex flex-col items-center justify-center px-4 text-center">
      {/* Number */}
      <h1 className="text-[120px] font-bold text-brand-light leading-none select-none">
        404
      </h1>

      <h2 className="text-2xl font-bold text-luxe-text mb-3 -mt-4">
        Page Not Found
      </h2>

      <p className="text-sm text-luxe-muted max-w-sm leading-relaxed mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back to something beautiful.
      </p>

      <div className="flex items-center gap-3">
        <Button onClick={() => navigate(-1)} variant="outlined">
          Go Back
        </Button>
        <Button onClick={() => navigate(ROUTES.HOME)}>Back to Home</Button>
      </div>
    </div>
  );
}
