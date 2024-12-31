import StoreNavigationDoubleColumn from "@/components/store/storeDoubleColumn";
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 p-6">
      <div className="-mx-4 flex flex-wrap">
        {/* Left Column */}
        <div className="w-full px-4 md:w-1/3">
          <h5 className="mt-5 text-lg font-semibold">Shopping Online</h5>
          <p className="text-gray-600 mt-3 text-sm">
            The time is now for it to be okay to be great. People in this world
            shun people for being great. For being a bright color. For standing
            out.
          </p>
        </div>

        {/* Right Column */}
        <div className="w-full px-4 md:w-2/3">
          <StoreNavigationDoubleColumn />
        </div>

        {/* Copyright */}
        <div className="mt-5 w-full text-center">
          <p className="text-gray-600 text-sm">
            Copyright © {currentYear} Astro Ecommerce by{" "}
            <Link
              to="https://www.creative-tim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Creative Tim
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
