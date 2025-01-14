import React from "react";

const AnimatedLoveMessage: React.FC = () => {
  return (
    <div className="">
      <div className="flex transform flex-col items-center justify-center bg-white bg-opacity-80 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-2 text-center shadow-xl transition-transform duration-300 ease-in-out hover:scale-105">
        <div className="typo-3 relative flex justify-center overflow-hidden">
          <span className="animate-pulse bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-sm font-bold text-transparent">
            ❤️❤️❤️ Thương Gửi Bạn Chiếc Ôm Thật Chặt ❤️❤️❤️
          </span>
          <div className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent to-transparent"></div>
        </div>
        <div className="mt-2 flex justify-center space-x-2">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className="inline-block animate-bounce"
              style={{ animationDelay: `${index * 1.1}s` }}
            >
              ❤️
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLoveMessage;
