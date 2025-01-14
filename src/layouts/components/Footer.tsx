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
          <div className="mt-5 text-lg font-semibold">Second Hand</div>
          <div className="mt-3 text-sm text-gray-600">
            The time is now for it to be okay to be great. People in this world
            shun people for being great. For being a bright color. For standing
            out.
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full px-4 md:w-2/3">
          <StoreNavigationDoubleColumn />
        </div>

        {/* Copyright */}
        <div className="mt-5 w-full text-center">
          <div className="text-sm text-gray-600">
            © {currentYear} Second Hand by{" "}
            <Link
              to="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              DuyTran
            </Link>
            .
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
