"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import Loading from "@/components/layout/Loading";
import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const SuccessPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("registrationId");

  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <CheckCircle className="h-10 w-10 text-amber-600" />
        </div>
        
        <h1 className="mt-6 text-3xl font-bold font-heading text-gray-800">
          Your Journey Begins
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for registering for the <strong>Youth Gita Summit 2025</strong>. We are honored to welcome you on this path of wisdom and discovery.
        </p>

        {registrationId && (
          <p className="mt-2 text-gray-600">
            Your reference ID is <strong>{registrationId}</strong>
          </p>
        )}

        {/* Informational Notice */}
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mt-6 text-left">
          <h4 className="font-semibold">What's Next?</h4>
          <p className="mt-2">
            You will receive a confirmation email shortly with further details about the summit. Please keep an eye on your inbox (and spam folder, just in case).
          </p>
        </div>

        <div className="mt-8">
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
};

const SuccessPage = () => (
  <Suspense fallback={<Loading />}>
    <SuccessPageContent />
  </Suspense>
);

export default SuccessPage;