'use client';

import { motion } from 'framer-motion';
import { RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming you use shadcn/ui

const FailedPage = () => {
  return (
    <main className="flex md:min-h-screen min-h-[80vh] items-center justify-center bg-amber-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <RefreshCcw className="h-8 w-8 text-amber-600" />
        </div>

        <h1 className="mt-6 text-2xl font-bold font-heading text-gray-800">
          A Moment of Pause on the Path
        </h1>

        <p className="mt-4 text-gray-600">
          Sometimes, our journey encounters a brief obstacle. Please take a moment, breathe, and let us try to proceed again when you are ready.
        </p>

        <div className="mt-8 flex md:flex-col md:space-y-4 flex-row space-y-0 space-x-4">
          
          <Button asChild size="lg" variant="outline" className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
};

export default FailedPage;