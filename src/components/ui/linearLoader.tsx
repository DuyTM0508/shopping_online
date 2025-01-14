import React from "react";

interface LinearLoaderProps {
  progress: number; // A number between 0 and 100
}

const LinearLoader: React.FC<LinearLoaderProps> = ({ progress }) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {/* <span className="inline-block rounded-full px-2 py-1 text-xs font-semibold uppercase text-teal-600">
          Loading...
        </span> */}
        {/* <span className="inline-block rounded-full px-2 py-1 text-xs font-semibold uppercase text-teal-600">
          {progress}%
        </span> */}
      </div>
      <div className="flex items-center justify-between">
        <div className="h-1 w-full rounded-full bg-gray-200">
          <div
            className="h-1 rounded-full bg-teal-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LinearLoader;
