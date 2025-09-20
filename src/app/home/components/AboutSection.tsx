'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";

const AboutSection = () => {
  return (
    // Changed background to a warm, off-white for a serene feel
    <section id="about" className="py-20 px-6 md:px-12 bg-amber-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Using a rich, deep amber for accent text */}
            <span className="text-amber-700 font-medium tracking-wide">A Journey into Timeless Wisdom</span>
            {/* For a more formal feel, consider a serif font like 'Lora' or 'Merriweather' for headings */}
            <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold text-gray-800">
              Youth Gita Summit 2025
            </h2>
            {/* Accent color for the underline */}
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Softer shadow and subtler hover effect for a more graceful interaction */}
            <div className="rounded-2xl overflow-hidden shadow-xl relative group">
              <Image
                src="/image.png" // Recommended: Replace with a relevant image
                alt="Youth Gita Summit"
                layout="responsive"
                width={1074}
                height={720}
                className="object-cover transition-transform duration-700 group-hover:scale-105" // Subtler zoom
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white font-heading text-2xl font-bold">
                  Embracing Eternal Wisdom
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            // Increased spacing for better readability and a more formal layout
            className="space-y-8"
          >
            <p className="text-xl font-semibold text-gray-900">
              An Invitation to Discover the Youth and the Message of the Bhagavad Gita.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              On behalf of GIEO Gita and Manav Rachna International Institute of Research and Studies (MRIIRS), we extend a formal invitation to participate in this prestigious national summit. It's envisioned as a powerful platform to inspire India’s youth through the eternal wisdom of the Bhagavad Gita, preparing them for leadership, ethical decision-making, and resilience in today’s world.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              The summit will bring together outstanding delegates from all States and Union Territories, offering an unparalleled opportunity for spiritual growth, cultural exchange, and academic enrichment.
            </p>

            {/* Event Details with updated color scheme */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {[
                { icon: <Calendar className="text-amber-800 h-6 w-6" />, label: "November 6, 2025" },
                { icon: <MapPin className="text-amber-800 h-6 w-6" />, label: "Talkatora Stadium, Delhi" },
                { icon: <Users className="text-amber-800 h-6 w-6" />, label: "150+ Delegates" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-white shadow-lg rounded-xl">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <h4 className="text-xl text-center text-gray-700 font-bold ">{item.label}</h4>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;