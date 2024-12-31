import React from "react";
import { Link } from "react-router-dom";

const StoreNavigationDoubleColumn: React.FC = () => {
  const navLinks = [
    "Tops",
    "Designers",
    "Tops",
    "Collection",
    "Texture",
    "Sale",
  ];
  const additionalLinks = [
    "Prints",
    "Silk Edition",
    "Brands",
    "Demos",
    "Showroom",
  ];

  return (
    <div className="mt-5 flex flex-wrap">
      {/* Store Column */}
      <div className="mb-4 w-full lg:mb-0 lg:w-1/2">
        <h6 className="w-full border-b pb-3">Store</h6>
        <div className="flex pt-2">
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <li key={index} className="text-sm">
                <Link
                  to="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="ml-6 space-y-2 lg:ml-10">
            {additionalLinks.map((link, index) => (
              <li key={index} className="text-sm">
                <Link
                  to="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Categories Column */}
      <div className="w-full lg:w-1/2">
        <h6 className="w-full border-b pb-3">Categories</h6>
        <div className="flex pt-2">
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <li key={index} className="text-sm">
                <Link
                  to="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="ml-6 space-y-2 lg:ml-10">
            {additionalLinks.map((link, index) => (
              <li key={index} className="text-sm">
                <Link
                  to="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoreNavigationDoubleColumn;
