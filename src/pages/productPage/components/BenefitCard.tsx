"use client";

import { ImageSource } from "@/assets";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface BenefitCardProps {
  primaryImage: string;
  secondaryImage: string;
  title: string;
  description: string;
  delay: number;
}

const BenefitCard = ({
  primaryImage,
  secondaryImage,
  title,
  description,
  delay,
}: BenefitCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center justify-center p-4 transition-all duration-300"
    >
      <motion.div
        className="relative h-40 w-40"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isHovered ? "secondary" : "primary"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <img
              src={isHovered ? secondaryImage : primaryImage}
              alt={title}
              width={160}
              height={160}
              className="h-40 w-auto object-contain transition-all duration-300"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="mt-6 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </motion.div>
    </motion.div>
  );
};

export function ShippingBenefits() {
  const benefits = [
    {
      primaryImage: ImageSource.suit1,
      secondaryImage: ImageSource.product2,
      title: "Free Shipping",
      description: "For orders over 500k VND",
    },
    {
      primaryImage: ImageSource.suit1,
      secondaryImage: ImageSource.product2,
      title: "Fast Delivery",
      description: "2-3 business days",
    },
    {
      primaryImage: ImageSource.suit1,
      secondaryImage: ImageSource.product2,
      title: "Secure Payment",
      description: "100% secure checkout",
    },
    {
      primaryImage: ImageSource.suit1,
      secondaryImage: ImageSource.product2,
      title: "24/7 Support",
      description: "Always here to help",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-medium text-gray-900"
      >
        You may also like
      </motion.h2>

      <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            primaryImage={benefit.primaryImage}
            secondaryImage={benefit.secondaryImage}
            title={benefit.title}
            description={benefit.description}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
}
