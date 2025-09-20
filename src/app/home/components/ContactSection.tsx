'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Loader2, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRef, useState } from 'react';

// Dynamically import the map to prevent SSR issues
const MapEmbed = dynamic(() => import('@/components/ui/MapEmbed'), { ssr: false });

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = {
      name: (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
      email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
      subject: (e.currentTarget.elements.namedItem('subject') as HTMLInputElement).value,
      message: (e.currentTarget.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setMessage('Message sent successfully!');
      formRef.current?.reset();
    } catch (error) {
      setMessage('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12 bg-amber-50 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-700 font-medium tracking-wide">Connect With Us</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold text-gray-800">Inquiries & Support</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              For inquiries regarding participation, or any other details about the Youth Gita Summit 2025, please feel free to reach out.
            </p>
          </motion.div>
        </div>



          {/* Right Column: Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-heading">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Event Coordinator</h4>
                      <p className="text-gray-600 mt-1">99965 51615</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">General Inquiries</h4>
                      <p className="text-gray-600 mt-1">gieogita@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Building className="w-5 h-5 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Organizing Body</h4>
                      <p className="text-gray-600 mt-1">Gita Gyan Sansthanam, KDB Road, Kurukshetra.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* The MapEmbed will render here */}
              <MapEmbed />
          </motion.div>
        </div>
    </section>
  );
};

export default ContactSection;