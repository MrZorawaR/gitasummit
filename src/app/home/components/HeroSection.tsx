'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const parallaxElement = heroRef.current.querySelector('.parallax-bg') as HTMLElement;

      if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={heroRef} className="relative h-[100dvh] flex items-center justify-start overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 parallax-bg">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90 z-10"></div> */}
        <Image
          src="/hero.png"
          alt="Sangrila Event"
          layout="fill"
          className="absolute inset-0 object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl">


        <motion.h1
          className="my-6 text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          युवा गीता शिखर सम्मेलन <span className="text-sangrila-400">2025</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <span className="bg-white/10 text-white backdrop-blur-sm py-1 px-4 rounded-full text-md font-medium mt-5">
            06<sup>th</sup> Nov, 2025
          </span>
        </motion.div>

        <motion.p
          className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Join us for Youth Gita Summit 2025 – a vibrant celebration of wisdom, culture, and youth leadership inspired by the timeless message of the Bhagavad Gita. An unforgettable experience awaits!
        </motion.p>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <motion.button
          onClick={handleScrollDown}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5
          }}
          className="text-white flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ArrowDownCircle size={24} />
        </motion.button>
      </div>
    </div>
  );
}
