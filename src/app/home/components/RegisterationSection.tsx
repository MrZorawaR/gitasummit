"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpenCheck } from "lucide-react"; // A more thematic icon
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export const RegistrationSection = () => {
  const router = useRouter();

  // The link for the single registration page
  const registrationLink = "/register/guest";

  const handleNavigate = () => {

      router.push(registrationLink);
  };

  return (
    // Section using the warm, spiritual background color
    <section id="register" className="py-20 px-6 md:px-12 bg-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-700 font-medium tracking-wide">Embark on the Journey</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold text-gray-800">
              Register for the Summit
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We invite all to register for this transformative experience. Secure your place to explore the timeless wisdom of the Bhagavad Gita.
            </p>
          </motion.div>
        </div>

        {/* Centered container for a single, focused registration card */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-xl"
          >
            <Card
              className={cn(
                "transition-all duration-300 ease-in-out shadow-lg",
                "hover:shadow-2xl hover:-translate-y-2" // Enhanced hover effect
              )}
            >
              <CardHeader className="p-8 items-center">
                <div className="w-16 h-16 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <BookOpenCheck className="h-8 w-8 text-amber-700 " />
                </div>
                <CardTitle className="text-3xl font-heading font-bold text-gray-900">
                  Registration
                </CardTitle>
                <CardDescription className="mt-2 text-gray-600 text-base">
                  For delegates to engage in enriching discussions, gain valuable insights, and connect with peers and thought leaders from across the country.                </CardDescription>
              </CardHeader>

              <CardFooter className="p-8 pt-0">
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white" // Themed button
                  size="lg"
                  onClick={handleNavigate}
                >
                  Register Now
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};