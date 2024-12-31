import Loading from "../ui/loading";

const LoadingScreen = () => {
  return (
    <div
      className={
        "fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-bgLoadingApp backdrop-blur-sm "
      }
    >
      <Loading className={"h-16 w-16 text-main-primary"} />
    </div>
  );
};

export default LoadingScreen;
