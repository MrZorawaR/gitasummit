"use client";

import { useState, useEffect } from "react";
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
import { Sparkles, CheckCircle2, HelpCircle, Stars, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- Type Definitions ---
type GitaFollow = "yes" | "no";
type GitaRating = "low" | "medium" | "high";

type GuestForm = {
  name: string;
  email: string;
  address: string;
  whatsapp: string;
  mobile: string;
  city: string;
  state: string;
  followsGita: GitaFollow | "";
  gitaSelfRating: GitaRating | "";
};

// --- Main Component ---
export default function GuestRegistration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<GuestForm>({
    name: "",
    email: "",
    address: "",
    whatsapp: "",
    mobile: "",
    city: "",
    state: "",
    followsGita: "",
    gitaSelfRating: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof GuestForm, string>>>({});

  // --- Utility & Helper Functions ---
  const onlyDigits = (v: string) => v.replace(/\D/g, "").slice(0, 10);

  const ratingText: Record<GitaRating, string> = {
    low: "I’m just starting. I read/practice rarely but want to improve.",
    medium: "I follow often — some verses, some practice, building consistency.",
    high: "Gita is integral to my life — regular study & practice.",
  };

  // --- Validation Logic ---
  const validateForm = () => {
    const newErrors: Partial<Record<keyof GuestForm, string>> = {};

    // Name validation
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters.";

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!emailPattern.test(formData.email)) newErrors.email = "Please enter a valid email address.";

    // Mobile & WhatsApp validation
    const phonePattern = /^[0-9]{10}$/;
    if (!formData.mobile) newErrors.mobile = "Mobile number is required.";
    else if (!phonePattern.test(formData.mobile)) newErrors.mobile = "Must be a valid 10-digit number.";
    if (!formData.whatsapp) newErrors.whatsapp = "WhatsApp number is required.";
    else if (!phonePattern.test(formData.whatsapp)) newErrors.whatsapp = "Must be a valid 10-digit number.";

    // Address validation
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";

    // Gita validation
    if (!formData.followsGita) {
      newErrors.followsGita = "Please select an option.";
    } else if (formData.followsGita === "yes" && !formData.gitaSelfRating) {
      newErrors.gitaSelfRating = "Please select your practice rating.";
    }

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // --- Handlers ---
  const handleChange = <K extends keyof GuestForm>(field: K, value: GuestForm[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for the field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, registrationType: "guest" }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Failed to register");

      toast.success("Registration Successful!");
      router.push(`/register/success?registrationId=${result.registrationId}`);
    } catch (e: any) {
      toast.error(e.message || "Registration Failed! Please try again.");
      router.push("/register/failed");
    } finally {
      setLoading(false);
    }
  };

  const FormError = ({ name }: { name: keyof GuestForm }) =>
    errors[name] ? (
      <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
        <AlertCircle className="h-3.5 w-3.5" /> {errors[name]}
      </p>
    ) : null;

  return (
    <div className="min-h-screen w-full bg-amber-50/50">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold font-heading text-amber-900">Youth Gita Summit 2025</h1>
            <p className="text-muted-foreground mt-1">Participant Registration Form</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6">
              {/* Personal Details */}
              <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                  <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Full name" autoComplete="name" className="h-11"/>
                  <FormError name="name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="you@example.com" autoComplete="email" className="h-11"/>
                  <FormError name="email" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="mobile">Mobile Number <span className="text-red-500">*</span></Label>
                  <Input id="mobile" inputMode="numeric" value={formData.mobile} onChange={(e) => handleChange("mobile", onlyDigits(e.target.value))} placeholder="10-digit mobile" autoComplete="tel-national" className="h-11"/>
                  <FormError name="mobile" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="whatsapp">WhatsApp Number <span className="text-red-500">*</span></Label>
                  <Input id="whatsapp" inputMode="numeric" value={formData.whatsapp} onChange={(e) => handleChange("whatsapp", onlyDigits(e.target.value))} placeholder="10-digit WhatsApp" className="h-11"/>
                  <FormError name="whatsapp" />
                  <div className="flex items-center space-x-2 pt-1">
                     <input type="checkbox" id="sameAsMobile" onChange={(e) => { if(e.target.checked) handleChange("whatsapp", formData.mobile) }} />
                     <label htmlFor="sameAsMobile" className="text-xs font-medium leading-none text-muted-foreground">Same as Mobile Number</label>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                  <Input id="state" value={formData.state} onChange={(e) => handleChange("state", e.target.value)} placeholder="e.g., Haryana" className="h-11"/>
                  <FormError name="state" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                  <Input id="city" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} placeholder="e.g., Hisar" className="h-11"/>
                  <FormError name="city" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                  <Input id="address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} placeholder="House no, street, locality" autoComplete="street-address" className="h-11"/>
                  <FormError name="address" />
                </div>
              </div>

              {/* Gita Practice Section */}
              <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50/60 p-4 md:p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Stars className="h-5 w-5 text-amber-700" />
                  <h3 className="font-semibold text-amber-900">Bhagavad Gita Practice</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="followsGita" className="text-amber-900">Do you follow the Bhagavad Gita? <span className="text-red-500">*</span></Label>
                    <Select value={formData.followsGita} onValueChange={(v: GitaFollow) => { handleChange("followsGita", v); if (v === "no") handleChange("gitaSelfRating", ""); }}>
                      <SelectTrigger id="followsGita" className="h-11 border-amber-300 focus:ring-amber-600"><SelectValue placeholder="Select Yes or No" /></SelectTrigger>
                      <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
                    </Select>
                    <FormError name="followsGita" />
                  </div>
                  {formData.followsGita === "yes" && (
                    <div className="space-y-1.5">
                      <Label className="text-amber-900">How would you rate your current practice?</Label>
                      <div className="flex gap-2">
                        {(["low", "medium", "high"] as GitaRating[]).map(rating => (
                           <Button key={rating} type="button" variant={formData.gitaSelfRating === rating ? "default" : "outline"} className={`h-11 flex-1 capitalize ${formData.gitaSelfRating === rating ? "bg-amber-600 hover:bg-amber-700 text-white" : "border-amber-300"}`} onClick={() => handleChange("gitaSelfRating", rating)}>
                            {rating}
                          </Button>
                        ))}
                      </div>
                       <FormError name="gitaSelfRating" />
                       {formData.gitaSelfRating && (<p className="text-xs text-amber-800/90 pt-1">{ratingText[formData.gitaSelfRating]}</p>)}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-4">
              <Button type="submit" className="w-full h-11 text-base bg-amber-700 hover:bg-amber-800" disabled={loading}>
                {loading ? "Registering..." : "Register Now"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">By registering, you agree to receive event updates via email/WhatsApp.</p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

