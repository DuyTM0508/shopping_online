import { useEffect, useState } from "react";
import LinearLoader from "../ui/linearLoader";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => prev + 10);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [progress]);

  return (
    <div
    // className={
    //   "fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-bgLoadingApp backdrop-blur-sm"
    // }
    >
      <div className="">
        <LinearLoader progress={progress} />
      </div>
    </div>
  );
};

export default LoadingScreen;
