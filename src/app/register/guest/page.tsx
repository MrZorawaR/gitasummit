"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Stars,
} from "lucide-react";

// If you have shadcn Select component available:
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GitaFollow = "yes" | "no" | "";
type GitaRating = "low" | "medium" | "high" | "";

type GuestForm = {
  name: string;
  email: string;
  address: string;
  whatsapp: string;
  mobile: string;
  city: string;
  state: string;
  registrationType: "guest";
  // ✅ New Gita fields
  followsGita?: GitaFollow;
  gitaSelfRating?: GitaRating;
};

export default function GuestRegistration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ Form fields (kept simple)
  const [formData, setFormData] = useState<GuestForm>({
    name: "",
    email: "",
    address: "",
    whatsapp: "",
    mobile: "",
    city: "",
    state: "",
    registrationType: "guest",
    followsGita: "",
    gitaSelfRating: "",
  });

  const handleChange = <K extends keyof GuestForm>(field: K, value: GuestForm[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // keep phones 10 digits, digits-only
  const onlyDigits = (v: string) => v.replace(/\D/g, "").slice(0, 10);

  // Derived copy for rating text
  const ratingText: Record<GitaRating, string> = {
    low: "I’m just starting. I read/practice rarely but want to improve.",
    medium: "I follow often — some verses, some practice, building consistency.",
    high: "Gita is integral to my life — regular study & practice.",
    "": "",
  };

  const handleSubmit = async () => {
    // Basic validations
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    const phone10 = /^[0-9]{10}$/;
    if (!phone10.test(formData.mobile)) {
      toast.error("Enter a valid 10-digit Mobile number");
      return;
    }
    if (!phone10.test(formData.whatsapp)) {
      toast.error("Enter a valid 10-digit WhatsApp number");
      return;
    }
    if (!formData.state.trim()) {
      toast.error("State is required");
      return;
    }
    if (!formData.city.trim()) {
      toast.error("City is required");
      return;
    }
    if (!formData.address.trim()) {
      toast.error("Address is required");
      return;
    }

    // If user says "yes", gently encourage rating pick (not hard fail)
    if (formData.followsGita === "yes" && !formData.gitaSelfRating) {
      toast.message("Select your self-rating (Low/Medium/High) for Bhagavad Gita.");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ✅ send fields (backend can ignore extra if not needed)
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || "Failed to register");

      toast.success("Registration Successful!");

      // reset
      setFormData({
        name: "",
        email: "",
        address: "",
        whatsapp: "",
        mobile: "",
        city: "",
        state: "",
        registrationType: "guest",
        followsGita: "",
        gitaSelfRating: "",
      });

      if (result?.registrationId) {
        router.push(`/register/success?registrationId=${result.registrationId}`);
      } else {
        router.push(`/register/success`);
      }
    } catch (e) {
      toast.error("Registration Failed! Please try again.");
      router.push("/register/failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,rgba(250,204,21,0.08),rgba(255,255,255,0))]">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Header badge */}
        <div className="mb-6 flex items-center justify-center gap-2 text-sm text-gray-700">
          <Sparkles className="h-4 w-4" />
          <span>Welcome to</span>
          <span className="rounded-full bg-yellow-600 px-2 py-0.5 font-medium text-white shadow-sm">
            Youth Gita Summit 2025
          </span>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-2xl tracking-tight">
              Guest Registration
            </CardTitle>
            <CardDescription className="text-center">
              Fill your details to register as a guest.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            {/* Form grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Full name"
                  autoComplete="name"
                  className="h-11"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-11"
                />
              </div>

              {/* Mobile */}
              <div className="space-y-1.5">
                <Label htmlFor="mobile">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobile"
                  inputMode="numeric"
                  value={formData.mobile}
                  onChange={(e) => handleChange("mobile", onlyDigits(e.target.value))}
                  placeholder="10-digit mobile"
                  autoComplete="tel-national"
                  className="h-11"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-1.5">
                <Label htmlFor="whatsapp">
                  WhatsApp Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="whatsapp"
                  inputMode="numeric"
                  value={formData.whatsapp}
                  onChange={(e) => handleChange("whatsapp", onlyDigits(e.target.value))}
                  placeholder="10-digit WhatsApp"
                  className="h-11"
                />
              </div>

              {/* State */}
              <div className="space-y-1.5">
                <Label htmlFor="state">
                  State <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  placeholder="e.g., Haryana"
                  className="h-11"
                />
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <Label htmlFor="city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="e.g., Hisar"
                  className="h-11"
                />
              </div>

              {/* Address (full width) */}
              <div className="md:col-span-2 space-y-1.5">
                <Label htmlFor="address">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="House no, street, locality"
                  autoComplete="street-address"
                  className="h-11"
                />
              </div>
            </div>

            {/* --- Bhagavad Gita Section --- */}
            <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50/60 p-4 md:p-5">
              <div className="mb-3 flex items-center gap-2">
                <Stars className="h-5 w-5 text-yellow-700" />
                <h3 className="font-semibold text-yellow-900">
                  Bhagavad Gita Practice (Optional)
                </h3>
              </div>

              {/* Yes/No dropdown */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="followsGita" className="text-yellow-900">
                    Do you follow the Bhagavad Gita?
                  </Label>
                  <Select
                    value={formData.followsGita || ""}
                    onValueChange={(v: GitaFollow) => {
                      handleChange("followsGita", v);
                      if (v === "no") handleChange("gitaSelfRating", "");
                    }}
                  >
                    <SelectTrigger id="followsGita" className="h-11 border-yellow-300 focus:ring-yellow-600">
                      <SelectValue placeholder="Select Yes or No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-yellow-800/90 flex items-center gap-1">
                    <HelpCircle className="h-3.5 w-3.5" />
                    Your answer helps us tailor sessions.
                  </p>
                </div>

                {/* If Yes: show rating buttons + text */}
                {formData.followsGita === "yes" && (
                  <div className="space-y-2">
                    <Label className="text-yellow-900">How would you rate your current practice?</Label>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={formData.gitaSelfRating === "low" ? "default" : "outline"}
                        className={`h-10 flex-1 ${formData.gitaSelfRating === "low" ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "border-yellow-300"}`}
                        onClick={() => handleChange("gitaSelfRating", "low")}
                      >
                        Low
                      </Button>
                      <Button
                        type="button"
                        variant={formData.gitaSelfRating === "medium" ? "default" : "outline"}
                        className={`h-10 flex-1 ${formData.gitaSelfRating === "medium" ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "border-yellow-300"}`}
                        onClick={() => handleChange("gitaSelfRating", "medium")}
                      >
                        Medium
                      </Button>
                      <Button
                        type="button"
                        variant={formData.gitaSelfRating === "high" ? "default" : "outline"}
                        className={`h-10 flex-1 ${formData.gitaSelfRating === "high" ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "border-yellow-300"}`}
                        onClick={() => handleChange("gitaSelfRating", "high")}
                      >
                        High
                      </Button>
                    </div>

                    {/* Live rating text */}
                    {formData.gitaSelfRating && (
                      <div className="flex items-start gap-2 rounded-lg border border-yellow-200 bg-white/60 p-3 text-sm text-yellow-900">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-yellow-700" />
                        <p>{ratingText[formData.gitaSelfRating]}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* --- /Bhagavad Gita Section --- */}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              className="w-full h-11 text-base bg-yellow-700 hover:bg-yellow-800"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"
                    />
                  </svg>
                  Registering…
                </span>
              ) : (
                "Register"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to receive event updates on your registered
              email/WhatsApp.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
