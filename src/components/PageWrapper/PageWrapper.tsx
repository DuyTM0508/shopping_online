import Loading from "../ui/loading";

interface IPageWrapper {
  name: string;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

const PageWrapper = (props: IPageWrapper) => {
  const { name, className, children, isLoading = true } = props;
  return (
    <div
      className={`component:${name} page-full relative flex flex-col  p-8 ${className}`}
    >
      {isLoading && (
        <div className="page-full fixed bottom-0 left-0 z-[10] flex items-center  justify-center bg-bgLoadingApp backdrop-blur-sm">
          <Loading className={"h-16 w-16 text-main-primary"} />
        </div>
      )}
      {children}
    </div>
  );
};

export default PageWrapper;
