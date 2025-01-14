"use client";

import { motion } from "framer-motion";
import { ImageSource } from "@/assets";

export default function ProductFeature() {
  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="grid grid-cols-1 gap-12 px-20 py-16">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-2 items-center gap-4"
      >
        <motion.img
          {...fadeInLeft}
          src={ImageSource.suit1}
          alt="Western Suit 1"
          className="h-[26rem] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <motion.div
          {...fadeInRight}
          className="flex flex-col justify-center gap-4 p-15"
        >
          <h2 className="text-2xl font-semibold uppercase tracking-wider">
            Western Suit Collection – Suit 1: Elegant Style
          </h2>
          <p className="leading-relaxed text-gray-600">
            Suit 1 offers the perfect blend of elegance and modernity, ideal for
            formal parties or important meetings. With meticulous design and
            premium fabric, this suit ensures you stand out and feel confident
            in any situation.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-2 items-center gap-4"
      >
        <motion.div
          {...fadeInLeft}
          className="flex flex-col justify-center gap-4 p-15"
        >
          <h2 className="text-2xl font-semibold uppercase tracking-wider">
            Modern Western Suit – Suit 2: Luxurious Class
          </h2>
          <p className="leading-relaxed text-gray-600">
            Suit 2 is designed with sharp cuts and a modern silhouette, offering
            a powerful yet sophisticated look. Made from high-quality fabric,
            this suit is perfect for formal events and an ideal choice for
            business meetings.
          </p>
        </motion.div>
        <motion.img
          {...fadeInRight}
          src={ImageSource.suit2}
          alt="Western Suit 2"
          className="h-[26rem] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </motion.div>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-2 items-center gap-4"
      >
        <motion.img
          {...fadeInLeft}
          src={ImageSource.suit1}
          alt="Western Suit 3"
          className="h-[26rem] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <motion.div
          {...fadeInRight}
          className="flex flex-col justify-center gap-4 p-15"
        >
          <h2 className="text-2xl font-semibold uppercase tracking-wider">
            Elegant Western Suit – Suit 3: Professional and Refined
          </h2>
          <p className="leading-relaxed text-gray-600">
            Suit 3 is the ideal choice for those who appreciate a refined and
            professional style. With a tailored fit and soft fabric, this suit
            not only provides comfort but also allows you to exude
            sophistication with every step.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
