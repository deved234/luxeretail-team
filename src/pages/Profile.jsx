import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, MapPin, Save } from "lucide-react";
import { profileSchema } from "../validation/profileSchema";
import { useAuthStore } from "../store/useAuthStore";
import { updateProfile } from "../services/authService";
import { toast } from "react-hot-toast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="text-brand-primary">{icon}</div>
      <h2 className="text-base font-semibold text-luxe-text">{title}</h2>
    </div>
  );
}

export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.address?.phone || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zip: user?.address?.zip || "",
      country: user?.address?.country || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const updated = await updateProfile(user.id, {
        name: data.name,
        email: data.email,
        address: {
          fullName: data.name,
          phone: data.phone,
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
        },
      });
      updateUser(updated);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-luxe-text mb-8">My Profile</h1>

      {/* Avatar */}
      <div className="bg-white rounded-2xl border border-luxe-border p-6 mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center shrink-0">
          <span className="text-2xl font-bold text-brand-primary">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-lg font-semibold text-luxe-text">{user?.name}</p>
          <p className="text-sm text-luxe-muted">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Personal Info */}
        <div className="bg-white rounded-2xl border border-luxe-border p-6">
          <SectionTitle
            icon={<User size={18} />}
            title="Personal Information"
          />
          <div className="flex flex-col gap-4">
            <Input
              label="Full Name"
              placeholder="Jane Doe"
              error={errors.name?.message}
              {...register("name")}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="jane@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 234 567 8900"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl border border-luxe-border p-6">
          <SectionTitle icon={<MapPin size={18} />} title="Shipping Address" />
          <div className="flex flex-col gap-4">
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
                label="State"
                placeholder="NY"
                error={errors.state?.message}
                {...register("state")}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="ZIP Code"
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

        {/* Submit */}
        <Button
          type="submit"
          size="full"
          isLoading={isSubmitting}
          className="gap-2"
        >
          <Save size={18} />
          Save Changes
        </Button>
      </form>
    </div>
  );
}
