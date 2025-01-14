"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  images?: string[];
  defaultImage: string;
}

const ProductGallery = ({ images = [], defaultImage }: Props) => {
  const [selectedImage, setSelectedImage] = useState(defaultImage);

  const allImages = [defaultImage, ...(images || [])];

  return (
    <div className="flex w-full flex-col-reverse gap-6 lg:w-1/2 lg:flex-row">
      <div className="flex flex-row gap-4 overflow-x-auto lg:flex-col lg:overflow-y-auto">
        {allImages.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(image)}
            className={`relative min-w-[100px] overflow-hidden rounded-lg border-2 ${
              selectedImage === image
                ? "border-primary"
                : "border-transparent hover:border-gray-200"
            }`}
          >
            <img
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="h-[100px] w-[100px] object-cover"
            />
          </motion.button>
        ))}
      </div>

      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100"
          >
            <img
              src={selectedImage}
              alt="Product main image"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductGallery;
